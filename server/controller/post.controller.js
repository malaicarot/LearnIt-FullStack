import { PostService } from "../service/post.service.js";

const getAll = async (req, res) => {
  try {
    const userId = req.userId;
    res.json(await PostService.getAll(userId));
  } catch (error) {
    console.log("Error while get all post");
    console.error({ success: false, msg: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = req.body;
    const userId = req.userId;
    console.log(userId)

    if (!post.title) {
      throw new Error("Post is invalid");
    }

    res.json(await PostService.createPost(post, userId));
  } catch (error) {
    console.log("Error while create post");
    console.error({ msg: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = req.body;
    const postId = req.params.postId;
    const userId = req.userId;

    if (!post) {
      throw new Error("Post is invalid");
    }

    res.json(await PostService.updatePost(post, postId, userId));
  } catch (error) {
    console.log("Error while create post");
    console.error({ msg: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;

    res.json(await PostService.deletePost(postId, userId));
  } catch (error) {
    console.log("Error while delete post");
    console.error({ msg: error.message });
  }
};

export const PostController = {
  getAll,
  createPost,
  updatePost,
  deletePost,
};
