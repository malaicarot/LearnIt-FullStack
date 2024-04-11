import { UserService } from "../service/user.service.js";




// Kiểm tra trạng thái đăng nhập của người dùng

const checkLoginState = async(req, res) =>{
   try {
      const userId = req.userId;
      console.log(userId)
      res.json(await UserService.checkLoginState(userId))
      
   } catch (error) {
     
      console.log('Error while check!');
      res.json({success: false, msg: error.message});
   }
}

// Lấy tất cả dữ liệu người dùng
const getAll = async(req, res) => {
   try {

      res.json(await UserService.getAll());
      
   } catch (error) {
      console.log('Error while get all users!');
      console.error({msg: error.message});
      
   }
}

// Đăng ký người dùng
const register = async(req, res) => {
   try {
      const user = req.body;
      if(!user){
         throw new Error('Invalid userName and/or passWord!!');
      }

      res.json(await UserService.register(user));
      
   } catch (error) {
      console.log('Error while register!');
      res.json({success: false, message: error.message});            
   }
}

// Đăng nhập người dùng
const login = async(req, res) => {
   try {
      const user = req.body;
      if(!user){
         throw new Error('Invalid userName and/or passWord!!');
      }

      res.json(await UserService.login(user));
      
   } catch (error) {
      console.log('Error while register!');
      res.json({success: false, message: error.message});      
   }
}

// Upload background người dùng
const upload = async(req, res) =>{
   try {
      const file = req.file
      const userId = req.userId;

      if(!file){
         throw new Error('File is invalid!')
      }
      res.json(await UserService.upload(userId, file))
      
   } catch (error) {
      console.log('Error while upload file!');
      res.json({success: false, msg: error.message});
   }
}


export const UserController = {
   checkLoginState,
   register,
   login,
   getAll,
   upload
};