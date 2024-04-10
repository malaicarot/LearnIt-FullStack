import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
   userName : {type: String, require: true, unique: true},
   passWord: {type: String, require: true},
   createAt: {type: Date, default: Date.now()},
   background:{type: String}
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
