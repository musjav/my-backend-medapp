import 'dotenv/config'; // automatically loads .env
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.js';
// import itemsRouter from './routes/items.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/items', itemsRouter);
app.use('/api/appointments', appointmentRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
