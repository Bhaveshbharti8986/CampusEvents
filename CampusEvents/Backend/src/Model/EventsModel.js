import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true }, // Physical room or "Online"
    coverImageUrl: { type: String, default: "" },
    price: { type: Number, default: 0 },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
