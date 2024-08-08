import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();
const port = process.env.PORT || 3009;
const DB_URI = process.env.DB_URI;
const app = express();


app.use(cors());
app.use(express.json());

if (!DB_URI) {
  console.error("Error: DB_URI is not defined in the environment variables.");
  process.exit(1); // Exit the process with an error code
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); 
  }
};

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    app.use("/",(req,res)=> {
        res.send("server is running")
    })
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); 
  }
};

startServer()
