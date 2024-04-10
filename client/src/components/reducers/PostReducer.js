import { POSTS_TYPE } from "../../configs/postsCaseReducer";

export const PostReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POSTS_TYPE.POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };

    case POSTS_TYPE.POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };

    case POSTS_TYPE.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        postLoading: false,
      };
    case POSTS_TYPE.DELETED_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case POSTS_TYPE.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case POSTS_TYPE.FIND_POST:
      return {
        ...state,
        post: payload,
      };
    default:
      return state;
  }
};
