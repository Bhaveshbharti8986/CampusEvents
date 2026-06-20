import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'alert', 'event'], default: 'info' },
 
}, { timestamps: true });

const  NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel