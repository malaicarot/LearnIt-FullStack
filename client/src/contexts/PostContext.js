import React, { createContext, useReducer, useState } from "react";
import { PostReducer } from "../components/reducers/PostReducer";
import axios from "axios";
import { API_URL } from "./constants";
import { POSTS_TYPE } from "../configs/postsCaseReducer";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postsState, dispatch] = useReducer(PostReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  // Post Toast state
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Post Modal state
  const [showPostModal, setShowPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

  // Get all posts Func
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts/getAll`);
      if (response.data.success) {
        dispatch({
          type: POSTS_TYPE.POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      } else {
        dispatch({
          type: POSTS_TYPE.POSTS_LOADED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_TYPE.POSTS_LOADED_FAIL,
      });
    }
  };

  // Add New Post Func
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${API_URL}/posts/create`, newPost);
      if (response.data.success) {
        dispatch({
          type: POSTS_TYPE.ADD_POST,
          payload: response.data.posts,
        });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        console.error({ success: false, msg: "server is error!" });
      }
    }
  };

  //Delete Post Func
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/delete/${postId}`);
      if (response.data.success) {
        dispatch({
          type: POSTS_TYPE.DELETED_POST,
          payload: postId,
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        console.error({ success: false, msg: "delete is error!" });
      }
    }
  };

  // Find post when user cliked update
  const findPost = (postId) => {
    const post = postsState.posts.find((post) => post._id === postId);

    dispatch({
      type: POSTS_TYPE.FIND_POST,
      payload: post,
    });
  };

  //Update Post Func
  const updatePost = async (postId, postValue) => {
    try {
      const response = await axios.put(
        `${API_URL}/posts/update/${postId}`,
        postValue
      );
      if (response.data.success) {
        dispatch({
          type: POSTS_TYPE.UPDATE_POST,
          payload: response.data.posts,
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        console.error({ success: false, msg: "update is error!" });
      }
    }
  };

  //CONTEXT_DATA
  const postContextData = {
    getAll,
    postsState,
    showPostModal,
    showToast,
    showUpdatePostModal,
    setShowUpdatePostModal,
    setShowToast,
    setShowPostModal,
    addPost,
    deletePost,
    updatePost,
    findPost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
