// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  doctor: { type: String, required: true },
  date: { type: Number, required: true },
  month: { type: Number, required: true },
  // year: { type: Number, required: true },
  time: { type: String, required: true },
  fullDate: { type: Date },
   completed: { type: Boolean, default: false } // new field
}, { timestamps: true });


const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment; // ✅ default export for ES modules
