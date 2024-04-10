import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
   title : {type: String, require: true},
   description: {type: String},
   url: {type: String},
   status: {type: String, enum: ['TO LEARN', 'LEARNING', 'LEARNED']},
   user: {type: Schema.Types.ObjectId, ref: 'users'}
});

const PostModel = mongoose.model('posts', postSchema);

export default PostModel 
