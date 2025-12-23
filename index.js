import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import chatRoutes from './routes/chat.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
//database connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connect successfully');
  })
  .catch((err) => {
    console.log('database connection failed', err);
  });

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/', authRoutes);
app.use('/api/chat/', chatRoutes);


app.listen(port, () => {
  console.log(`port listening on ${port}`);
});
