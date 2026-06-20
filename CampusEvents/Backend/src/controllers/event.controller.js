import EventModel from "../Model/EventsModel.js"; 
import RegistrationModel from "../Model/Registration.Model.js";
import UserModel from"../Model/user.Model.js";
//public  routes controller

export const getAllEvents = async (req, res) => {
  try {
    const { search, category, limit } = req.query;
    
    // Build a dynamic query object
    let query = {};

    // If user typed in the search bar
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    let mongooseQuery = EventModel.find(query).sort({ dateTime: 1 }); 

    // If we only want a few events
    if (limit) {
      mongooseQuery = mongooseQuery.limit(Number(limit));
    }

    const events = await mongooseQuery;
    
    res.status(200).json({ 
      success: true, 
      count: events.length, 
      data: events 
    });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ success: false, message: "Server Error: Could not fetch events." });
  }
};

//   Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching event details:", error.message);
    
    // Handle invalid MongoDB ObjectIDs gracefully
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: "Event not found. Invalid ID format." });
    }
    res.status(500).json({ success: false, message: "Server Error: Could not fetch event details." });
  }
};


// ADMIN CONTROLLERS (Protected by Middleware)
//  Create a new event
export const createEvent = async (req, res) => {
  try {
   
    const { 
      title, 
      category, 
      dateTime, 
      location, 
      coverImageUrl, 
      price, 
      totalSeats, 
      description 
    } = req.body;

    // Create the event in the database
    // We also  save the creator's ID from req.user
    const newEvent = await EventModel.create({
      title,
      category,
      dateTime,
      location,
      coverImageUrl,
      price: price || 0,
      totalSeats: totalSeats || 100,
      description,
      createdBy: req.user._id 
    });

    res.status(201).json({ 
      success: true, 
      message: "Event created successfully", 
      data: newEvent 
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ success: false, message: "Server Error: Could not create event.", error: error.message });
  }
};

//   Update an existing event
export const updateEvent = async (req, res) => {
  try {
    let event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    // Update the event new data
    event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true 
    });

    res.status(200).json({ 
      success: true, 
      message: "Event updated successfully", 
      data: event 
    });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ success: false, message: "Server Error: Could not update event." });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {

    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    await event.deleteOne();

    res.status(200).json({ 
      success: true, 
      message: "Event deleted successfully." 
    });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ success: false, message: "Server Error: Could not delete event." });
  }
};




//     Register a student for an event
export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    
    //  Extract ALL the new data 
    const { 
      mobile, 
      branch, 
      year, 
      isTeamRegistration, 
      teamName 
    } = req.body;

    //  Check if the user is already registered 
    const existingRegistration = await RegistrationModel.findOne({ user: userId, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ success: false, message: "You are already registered for this event." });
    }

    //  Atomically find the event and decrease available seat
    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: eventId, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { new: true }
    );

    // If updatedEvent is null, either the event doesn't exist or it is full
    if (!updatedEvent) {
      return res.status(400).json({ success: false, message: "Sorry, this event is completely full." });
    }

    //  Generate a random 6-character Registration ID (e.g., REG-A7B2X9)
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const uniqueRegId = `REG-${randomCode}`;

    //  Create the Registration record with the new fields included
    const newRegistration = await RegistrationModel.create({
      user: userId,
      event: eventId,
      registrationId: uniqueRegId,
      mobile,
      branch,
      year,
      isTeamRegistration,
    
      teamName: isTeamRegistration ? teamName : "" 
    });

    res.status(201).json({ 
      success: true, 
      message: "Registration successful!", 
      registration: newRegistration,
      seatsLeft: updatedEvent.availableSeats
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ success: false, message: "Server error during registration." });
  }
};



export const getAdminDashboard = async (req, res) => {
  try {
    // Simple Count
    const activeEventsCount = await EventModel.countDocuments({ status: { $in: ['upcoming', 'ongoing'] } });
    const totalStudentsCount = await UserModel.countDocuments({ role: 'student' });
    const totalRegistrationsCount = await RegistrationModel.countDocuments();

    //  Explicit Populate 
    const recentRegistrations = await RegistrationModel.find()
      .populate({ 
        path: 'user', 
        select: 'username email', 
        model: UserModel
      })
      .populate({ 
        path: 'event', 
        select: 'title', 
        model: EventModel 
      }
      )
       
      .select('branch year teamName mobile status ') 
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      stats: {
        activeEvents: activeEventsCount,
        totalStudents: totalStudentsCount,
        totalRegistrations: totalRegistrationsCount
      },
      recentRegistrations
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ success: false, message: "Could not fetch dashboard stats." });
  }
};




export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all registrations for this student and populate the event details
    const registrations = await RegistrationModel.find({ user: userId })
      .populate('event')
      .sort({ createdAt: -1 });

    const now = new Date();
    
    let upcomingCount = 0;
    let attendedCount = 0;

    // Calculate stats based on event dates
    registrations.forEach(reg => {
      if (reg.event) {
        if (new Date(reg.event.dateTime) > now) {
          upcomingCount++;
        } else {
          attendedCount++;
        }
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        upcoming: upcomingCount,
        attended: attendedCount,
        certificates: 0 // Hardcoded until certificates feature is built
      },
      registrations: registrations
    });

  } catch (error) {
    console.error("Student Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard data." });
  }
};


