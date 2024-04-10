import bcrypt from "bcrypt";
import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

const salt = await bcrypt.genSalt(10);

const checkLoginState = async(userId) => {
  const user = UserModel.findById(userId).select('-passWord')
  if(!user){
    throw new Error({success: false})
  }

  return  user;
}


const getAll = async () => {

   return await UserModel.find({});
 };


const register = async (user) => {
  const currentUser = await UserModel.findOne({ userName: user.userName });

  if (currentUser) {
    throw new Error("User is exits!");
  }

  const hashPass = await bcrypt.hash(user.passWord, salt);

  const newUser = new UserModel({
    userName: user.userName,
    passWord: hashPass,
  });

  await newUser.save()

  return {success: true, user: newUser};
};

const upload = async (userId, file) => {
  const currentUser = await UserModel.findById(userId);

  if (!currentUser) {
    throw new Error("User is not exits!");
  }

  const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  const fileName = file.originalname.split(".")[0];

  const data = await cloudinary.uploader.upload(
    dataUrl,
    {
      public_id: fileName,
      resource_type: "auto",
      folder: "LearnIt_Background"
    },
  )
  currentUser.background = data.secure_url;

  await currentUser.save()

  return {success: true, user: currentUser};
};

const login = async (user) => {
  const currentUser = await UserModel.findOne({ userName: user.userName });

  if (!currentUser) {
    throw new Error("Invalid userName and/or passWord!");
    
  }


  const checkPass = bcrypt.compareSync(user.passWord, currentUser.passWord);

  if (!checkPass) {
    throw new Error("Invalid userName and/or passWord!");
  }

  const accessToKen = jwt.sign(
    { userId: currentUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return  {success: true, access_token: accessToKen};
};

export const UserService = {
  checkLoginState,
  register,
  login,
  getAll,
  upload
};
