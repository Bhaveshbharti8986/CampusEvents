import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    // Links to the Student who registered
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    // Links to the Event they registered for
    event: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Event", 
      required: true 
    },
    // The unique ticket ID (e.g., REG-A7B2X9)
    registrationId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    
    // --- New Fields from your Frontend Form ---
    mobile: { 
      type: String, 
      required: true 
    },
    branch: { 
      type: String, 
      default: "" 
    },
    year: { 
      type: String, 
      default: "" 
    },
    isTeamRegistration: {
      type: Boolean,
      default: false
    },
    teamName: { 
      type: String, 
      default: "" 
    },
    // ------------------------------------------

    status: {
      type: String,
      enum: ["confirmed", "attended", "cancelled"],
      default: "confirmed",
    }
  },
  { timestamps: true }
);

// This ensures one student cannot register for the exact same event twice!
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

const RegistrationModel = mongoose.model("Registration", registrationSchema);
export default RegistrationModel;