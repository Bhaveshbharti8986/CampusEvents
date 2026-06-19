import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true }, 
    coverImageUrl: { type: String, default: "" },
    price: { type: Number, default: 0 },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },

    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }
  },
  { timestamps: true }
);

//  Auto-set availableSeats before saving a NEW event
eventSchema.pre('validate', async function() {
  if (this.isNew && this.availableSeats === undefined) {
    this.availableSeats = this.totalSeats;
  }
});
const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;