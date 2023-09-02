import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export async function connect() {
  try {
    await mongoose.connect(
      process.env.URI
    );
    console.log(`Connected success to MongoDB`);
  } catch (error) {
    console.log(error);
  }
}
