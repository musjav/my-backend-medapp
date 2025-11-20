// import express from 'express';
// import User from '../models/user.js'; // make sure your User model is also using export

// const router = express.Router();

// // Signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const user = new User({ name, email, password,phone });
//     await user.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//     res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ Export default for ES Modules
// // export default router;
// // ❌ Remove module.exports for ES Modules



// // GET user by email
// router.get('/get-user', async (req, res) => {
//   const { email } = req.query;

//   if (!email) return res.status(400).json({ message: 'Email is required' });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ user });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // Update user profile
// router.put('/update-user', async (req, res) => {
//   const { email, name, phone } = req.body;

//   if (!email) return res.status(400).json({ message: 'Email is required' });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (name) user.name = name;
//     if (phone) user.phone = phone;

//     await user.save();
//     res.json({ success: true, message: 'Profile updated', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// export default router;


// api/auth.js
import { connectToDatabase } from "../utils/db.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  if (method === "POST") {
    const { type, name, email, password, phone } = req.body;

    if (type === "signup") {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, phone });
      await user.save();

      return res.status(201).json({ message: "User created successfully" });
    }

    if (type === "login") {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

      return res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
    }
  }

  if (method === "GET") {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ user });
  }

  if (method === "PUT") {
    const { email, name, phone } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();
    return res.status(200).json({ success: true, message: "Profile updated", user });
  }

  res.status(405).json({ message: "Method not allowed" });
}
