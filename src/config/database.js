import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error('Error: MONGODB_URI environment variable is missing in .env file.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error('\n--> TIP: Ensure MongoDB is running locally on port 27017 or provide a valid MongoDB Atlas connection URI in your .env file.\n');
    process.exit(1);
  }
};

export default connectDB;
