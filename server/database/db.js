import mongoose from "mongoose";



const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MongoDB Connection Error: MONGO_URI environment variable is not defined.");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};
export default connectDB; 