import { useContext } from "react";
import FeedContext from "../Context/FeedContext/FeedContext";

const useFeed = () => {
  const { feeds, isLoading, postFeed, deleteFeed, likeFeed, commentFeed } =
    useContext(FeedContext);

  return { feeds, isLoading, postFeed, deleteFeed, likeFeed, commentFeed };
};

export default useFeed;
