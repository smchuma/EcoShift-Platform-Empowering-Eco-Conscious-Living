import { useContext } from "react";
import PostContext from "../context/PostContext/PostContext";

const usePost = () => {
  const { posts, isLoading, postPost, deletePost, likePost, commentPost } =
    useContext(PostContext);

  return { posts, isLoading, postPost, deletePost, likePost, commentPost };
};

export default usePost;
