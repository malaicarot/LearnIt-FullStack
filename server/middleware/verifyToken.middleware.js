import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const verifyToken = (req, res, next) => {
  const authorization = req.header("access_token");
  const token = authorization && authorization.split(" ")[1];
  
  if (!token) {
    res.json({msg: "Error with token!!!"})
  }
  try {
   const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

   if(!decode){
      throw new Error("Token is wrong!");
   }

   req.userId = decode.userId;
   
   next();
  } catch (error) {
   console.log('Error while verify token!');
   console.error({msg: error.msg});
  }
};


export default verifyToken;
