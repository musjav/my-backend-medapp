// routes/appointmentRoutes.js
import express from 'express';
import Appointment from '../models/Appointment.js'; // include .js extension

const router = express.Router();

// Create appointment with clash check
router.post("/add", async (req, res) => {
  try {
    const { doctor, date, month, time } = req.body;

    const exists = await Appointment.findOne({ doctor, date, month, time });
    if (exists) return res.json({ success: false, message: "Doctor is already booked for this time." });

    const fullDate = new Date(`${month}-${date}-${new Date().getFullYear()}`);
    await Appointment.create({ doctor, date, month, time, fullDate });

    res.json({ success: true, message: "Appointment booked successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err });
  }
});

// Get all appointments
router.get("/get", async (req, res) => {
  try {
    const data = await Appointment.find().sort({ _id: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// Mark appointment as completed
router.put("/complete/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { completed: true },  // new field in schema
      { new: true }
    );

    if (!updated) return res.json({ success: false, message: "Appointment not found" });

    res.json({ success: true, message: "Appointment marked as completed", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//delete appointment
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.json({ success: false, message: "Appointment not found" });
    res.json({ success: true, message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router; // ✅ default export for ES module
