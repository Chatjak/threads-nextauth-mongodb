import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "").then(() => console.log('Connected to database successfully')
    );
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;