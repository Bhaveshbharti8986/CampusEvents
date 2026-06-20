import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
 
    registrationId: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      default: "",
    },
    year: {
      type: String,
      default: "",
    },
    isTeamRegistration: {
      type: Boolean,
      default: false,
    },
    teamName: {
      type: String,
      default: "",
    },
  

    status: {
      type: String,
      enum: ["confirmed", "attended", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);


registrationSchema.index({ user: 1, event: 1 }, { unique: true });

const RegistrationModel = mongoose.model("Registration", registrationSchema);
export default RegistrationModel;
