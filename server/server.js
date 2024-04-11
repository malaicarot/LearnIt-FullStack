import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ROUTER } from "./config/server.config.js";
import {UserRouter} from "./routes/user.route.js";
import {PostRouter} from "./routes/post.route.js";
import cors from 'cors'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dj6hobxmb', 
  api_key: '953964133121683', 
  api_secret: '4LbktCuPmCljlvOsc9WkwRxEJc0' 
});

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(ROUTER.USER.CONTEXT_PATH, UserRouter);

app.use(ROUTER.POST.CONTEXT_PATH, PostRouter);

const connectDB = async() => {
  try {
    await mongoose.connect(
      // `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS_WORD}@cluster0.to8ewaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      process.env.CONNECT_DB
    );
    console.log("waiting connect db!!");
    console.log("Connect successfully!!!");

    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running at port ${process.env.PORT || 8080}`);
    });
  } catch (error) {
    console.log("Error while connect db!!!");
    console.error({ message: error.message });
  }
}
connectDB();