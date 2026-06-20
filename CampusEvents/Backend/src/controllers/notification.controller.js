import NotificationModel from '../Model/NotificationModal.js'
export const createNotification = async (req, res) => {
      const { title, message, type } = req.body;
  try {
  
    const newNote = await NotificationModel.create({ title, message, type });
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to post notification"});
  }
};


export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notifications" });
  }
};