// import express from 'express';
// import Item from '../models/Items.js'; // make sure your model is also ES Module

// const router = express.Router();

// // // GET all items
// // router.get('/', async (req, res) => {
// //   try {
// //     const items = await Item.find();
// //     res.json(items);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // POST create item
// // router.post('/', async (req, res) => {
// //   const item = new Item({
// //     name: req.body.name,
// //     qty: req.body.qty
// //   });
// //   try {
// //     const newItem = await item.save();
// //     res.status(201).json(newItem);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // });

// // // ✅ Export default for ES Modules

// // GET /api/auth/get-user?email=<email>
// router.get('/get-user', async (req, res) => {
//     try {
//       const { email } = req.query;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         res.json({ user: { name: user.name, email: user.email, phone: user.phone } });
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
//     });
    
//     export default router;