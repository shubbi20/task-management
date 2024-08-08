import * as dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { errorHandler } from './error/error.middlerware';
import { HTTP_STATUS_CODE, ServiceError } from './error/error.interface';
import { responseFormatter } from './middleware/formatter.middleware';
import { BusinessLogicError } from './error/error';

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

export enum PRODUCT_ERROR_NAME {
    PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
    PRODUCT_ALREADY_EXISTS = 'PRODUCT_ALREADY_EXISTS',
    PRODUCT_UPDATION_FAILED = 'PRODUCT_UPDATION_FAILED',
    PRODUCT_CREATION_FAILED = 'PRODUCT_CREATION_FAILED',
    // Add other error names as needed
  }

export const PRODUCT_ERRORS: { [key in PRODUCT_ERROR_NAME]: ServiceError } = {
  [PRODUCT_ERROR_NAME.PRODUCT_NOT_FOUND]: {
    name: PRODUCT_ERROR_NAME.PRODUCT_NOT_FOUND,
    statusCode: HTTP_STATUS_CODE.NotFound,
  },
  [PRODUCT_ERROR_NAME.PRODUCT_ALREADY_EXISTS]: {
    name: PRODUCT_ERROR_NAME.PRODUCT_ALREADY_EXISTS,
    statusCode: HTTP_STATUS_CODE.Conflict,
  },
  [PRODUCT_ERROR_NAME.PRODUCT_UPDATION_FAILED]: {
    name: PRODUCT_ERROR_NAME.PRODUCT_UPDATION_FAILED,
    statusCode: HTTP_STATUS_CODE.UnprocessableEntity,
  },
  [PRODUCT_ERROR_NAME.PRODUCT_CREATION_FAILED]: {
    name: PRODUCT_ERROR_NAME.PRODUCT_CREATION_FAILED,
    statusCode: HTTP_STATUS_CODE.UnprocessableEntity,
  },
  // Add other error mappings as needed
};  
  

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
    app.use(responseFormatter);
    app.use("/",(req,res)=> {
        res.status(200).json({message:"Hello World"})
    })
    // app.use("/",(req,res)=> {
    //    throw new BusinessLogicError(PRODUCT_ERRORS.PRODUCT_NOT_FOUND, 'Product not found');
    // })
    app.use(errorHandler);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }); 
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); 
  }
};

startServer()
