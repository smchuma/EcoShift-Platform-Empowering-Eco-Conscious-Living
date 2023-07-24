import {
  Avatar,
  Box,
  Flex,
  Image,
  Stack,
  Button,
  Text,
  Input,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import useUser from "../../hooks/useUser";

import usePost from "../../hooks/usePost";
import { BsChatDotsFill, BsFillHeartFill } from "react-icons/bs";
import { MdOutlineDeleteForever } from "react-icons/md";

const FeedPost = (post) => {
  const { user } = useUser();
  const { deletePost, likePost, commentPost } = usePost();
  const isLiked = post.post.likes.includes(user._id);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  const firstName = `${post.post.user.firstName
    .charAt(0)
    .toUpperCase()}${post.post.user.firstName.slice(1)}`;
  const lastName = `${post.post.user.lastName
    .charAt(0)
    .toUpperCase()}${post.post.user.lastName.slice(1)}`;

  const handleDelete = async () => {
    try {
      await deletePost.mutate(post.post._id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoin = () => {
    if (!isLiked) {
      likePost.mutate({ postId: post.post._id, userId: post.post.userId });
    }
  };

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    commentPost.mutate({
      postId: post.post._id,
      comment,
    });
    setComment("");
  };

  function getTimeDifference(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMilliseconds = now - postTime;
    const diffSeconds = diffMilliseconds / 1000;
    const diffMinutes = diffSeconds / 60;
    const diffHours = diffMinutes / 60;
    const diffDays = diffHours / 24;

    if (diffMinutes < 1) {
      return "just now";
    } else if (diffHours < 1) {
      return `${Math.round(diffMinutes)} minutes ago`;
    } else if (diffDays < 1) {
      return `${Math.round(diffHours)} hours ago`;
    } else {
      return `${Math.round(diffDays)} days ago`;
    }
  }
  const timePost = getTimeDifference(post.post.createdAt);

  return (
    <div>
      <Stack
        cursor="pointer"
        borderColor="#104c46"
        pb={5}
        backgroundColor="transparent"
        borderWidth={2}
        borderRadius="20px"
      >
        <Flex p={4} align="center" justify="space-between">
          <Flex align="center">
            <Avatar
              size="sm"
              name={firstName + " " + lastName}
              src={post.post.user.profilePicture}
            />

            <Text ml={2} fontSize="sm" color="white">
              {firstName + " " + lastName}
            </Text>
            <Box>
              <Text fontSize="sm" color="gray.500" ml={2} fontWeight="bold">
                {timePost}
              </Text>
            </Box>
          </Flex>
          <Box>
            {post.post.userId === user._id && (
              <Icon
                as={MdOutlineDeleteForever}
                w={5}
                h={5}
                _hover={{ color: "red.500" }}
                color="white"
                onClick={handleDelete}
              />
            )}
          </Box>
        </Flex>
        <Box>
          {post.post.img && (
            <Box>
              <Image
                src={post.post.img}
                borderRadius="md"
                alt=""
                boxSize="100%"
                objectFit="cover"
              />
            </Box>
          )}
        </Box>
        <Flex justify="space-between">
          <Flex align="center">
            <Icon
              as={BsFillHeartFill}
              color={isLiked ? "red.500" : "gray"}
              onClick={handleJoin}
              fontSize="25px"
              ml={2}
            />
            <Icon
              as={BsChatDotsFill}
              color="white"
              fontSize="25px"
              ml={2}
              transform="scaleX(-1)"
              onClick={handleCommentClick}
            />
          </Flex>
          <Flex align="center">
            <Box
              display="flex"
              align="center"
              justify="center"
              mr={1}
              px="10px"
            >
              <Text fontSize="sm" color="white">
                {post.post.likes.length} likes
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Stack mt={2} px={2} direction="row">
          <Flex>
            <Text>{post.post.desc}</Text>
          </Flex>
        </Stack>
        <Text mx={5} onClick={handleCommentClick} fontSize="sm" color="white">
          View all {post.post.comments.length} comments
        </Text>

        {showCommentInput && (
          <>
            <Box mt={4}>
              <form onSubmit={handleCommentSubmit}>
                <Flex align="center">
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    mr={2}
                  />
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="sm"
                    variant="solid"
                    mr={2}
                  >
                    Post
                  </Button>
                </Flex>
              </form>
            </Box>
            <Box p="2" my="2">
              {post.post.comments.map((comment) => (
                <Box key={comment.itemId} p="2" my="2">
                  <Stack p={2} borderRadius={20}>
                    <Flex justify="space-between">
                      <Flex align="center" px={2}>
                        <Avatar
                          size="sm"
                          name={
                            comment.user.firstName + " " + comment.user.lastName
                          }
                          src={comment?.user.profilePicture}
                        />
                        <Text px={2} fontSize="sm" color="gray.500">
                          {comment.user.firstName + " " + comment.user.lastName}
                        </Text>
                      </Flex>
                    </Flex>
                    <Box p={3}>
                      <p>{comment.comment}</p>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Stack>
    </div>
  );
};

export default FeedPost;
