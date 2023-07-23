import { useContext } from "react";
import FeedContext from "../context/FeedContext/FeedContext";

const useFeed = () => {
  const { feeds, isLoading, postFeed, deleteFeed, likeFeed, commentFeed } =
    useContext(FeedContext);

  return { feeds, isLoading, postFeed, deleteFeed, likeFeed, commentFeed };
};

export default useFeed;
