import PostModel from "../model/post.model.js";

const findPostById = async (id) => {
  return await PostModel.findById(id);
};
const getAll = async (userId) => {
  const posts = await PostModel.find({ user: userId }).populate("user", [
    "userName",
  ]);

  return { success: true, posts: posts };
};

const createPost = async (post, userId) => {
  // const currentPost = await PostModel.find({
  //   'user': userId,
  //   'title': { "$regex": title, "$option": "i" },
  // });

  // if(currentPost){
  //   console.log('d')
  //   throw new Error("Post title is exits!")
  // }
  

  const HTTPS_URL = post.url.startsWith("https://")
    ? post.url
    : `https://${post.url}`;

  const newPost = new PostModel({
    title: post.title,
    description: post.description,
    url: HTTPS_URL,
    status: post.status || "TO LEARN",
    user: userId,
  });
  await newPost.save();
  return { success: true, posts: newPost };
};

const updatePost = async (post, postId, userId) => {
  const currentPost = await PostModel.findById({ _id: postId });

  if (post.url !== undefined) {
    post.url = post.url.startsWith("https://")
      ? post.url
      : `https://${post.url}`;
  }

  if (!currentPost || currentPost.user.toString() !== userId) {
    throw new Error("This post id invalid or is not owned by you!!!");
  }
  for (const key in post) {
    currentPost[key] = post[key];
  }
  await currentPost.save()
  return { success: true, posts: currentPost };
};

const deletePost = async (postId, userId) => {
  const deletePostCondition = { _id: postId, user: userId };
  const deletePost = await PostModel.findByIdAndDelete(deletePostCondition);
  if (!deletePost) {
    throw new Error("Cannot delete post!!!");
  }
  return { success: true, deletePost };
};

export const PostService = {
  getAll,
  createPost,
  updatePost,
  deletePost,
};
