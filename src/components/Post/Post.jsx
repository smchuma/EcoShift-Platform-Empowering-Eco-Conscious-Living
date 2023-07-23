import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Input,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidGroup } from "react-icons/bi";
import { BiCommentAdd } from "react-icons/bi";

const Post = (feed) => {
  // const { user } = useUser();
  // const { deleteFeed, likeFeed, commentFeed } = useFeed();
  // const isLiked = feed.feed.likes.includes(user._id);
  // const [comment, setComment] = useState("");
  // const [showCommentInput, setShowCommentInput] = useState(false);

  // function getTimeDifference(timestamp) {
  //   const now = new Date();
  //   const postTime = new Date(timestamp);
  //   const diffMilliseconds = now - postTime;
  //   const diffSeconds = diffMilliseconds / 1000;
  //   const diffMinutes = diffSeconds / 60;
  //   const diffHours = diffMinutes / 60;
  //   const diffDays = diffHours / 24;

  //   if (diffMinutes < 1) {
  //     return "just now";
  //   } else if (diffHours < 1) {
  //     return `${Math.round(diffMinutes)} minutes ago`;
  //   } else if (diffDays < 1) {
  //     return `${Math.round(diffHours)} hours ago`;
  //   } else {
  //     return `${Math.round(diffDays)} days ago`;
  //   }
  // }
  // const timePost = getTimeDifference(feed.feed.createdAt);

  // const firstName = `${feed.feed.user.firstName
  //   .charAt(0)
  //   .toUpperCase()}${feed.feed.user.firstName.slice(1)}`;
  // const lastName = `${feed.feed.user.lastName
  //   .charAt(0)
  //   .toUpperCase()}${feed.feed.user.lastName.slice(1)}`;

  // const handleDelete = async () => {
  //   try {
  //     await deleteFeed.mutate(feed.feed._id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleLikeClick = () => {
  //   if (!isLiked) {
  //     likeFeed.mutate({ postId: feed.feed._id, userId: feed.feed.userId });
  //   }
  // };

  // const handleCommentClick = () => {
  //   setShowCommentInput(!showCommentInput);
  // };

  // const handleCommentSubmit = (e) => {
  //   e.preventDefault();
  //   commentFeed.mutate({
  //     postId: feed.feed._id,
  //     comment,
  //   });
  //   setComment("");
  // };

  return (
    <div>
      <Stack
        cursor="pointer"
        borderBottom="2px solid #104c46"
        pb={5}
        backgroundColor="transparent"
      >
        <Box>
          {/* {feed.feed.img && (
            <Box mt={4}>
              <Image
                src={feed.feed.img}
                borderRadius="md"
                alt=""
                boxSize="100%"
                objectFit="cover"
              />
            </Box>
          )} */}
          <Box mt={4}>
            <Image
              src="https://earthforce.org/wp-content/uploads/2021/08/CSC_LandingPage_1300x6504.jpg"
              borderRadius="md"
              alt=""
              boxSize="100%"
              objectFit="cover"
            />
          </Box>
        </Box>
        <Flex px={4} mt="20px" justify="space-between">
          <Flex align="center">
            <Button
              bg="#177067"
              color="white"
              fontWeight="300"
              variant="unstyled"
              // onClick={handleLikeClick}
              w="100px"
              _hover={{ transform: "scale(1.05)" }}
            >
              Join
            </Button>
          </Flex>
          <Flex align="center">
            <Box
              display="flex"
              align="center"
              justify="center"
              mr={4}
              padding="10px"
              ml={2}
            >
              <Icon as={BiSolidGroup} w={5} h={5} color="white" mr={2} />
              <Text fontSize="sm" color="white">
                {/* {feed.feed.likes.length} people like it */}5 participants
              </Text>
            </Box>
            <Box mr={5}>
              <Text fontSize="sm" color="brand.secondary">
                {/* {feed.feed.comments.length} comments */}4 comments
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Stack mt={4} borderTopWidth="1px" borderTopColor="#177067">
          <Box mt={4}>
            <Text>title</Text>
          </Box>
          <Box mt={2}>
            <Text>description</Text>
          </Box>
        </Stack>
        <Flex
          mt={5}
          alignItems="center"
          justify="center"

          // sssssssssssssssssssssssss
        >
          <Box>
            <Flex align="center">
              <Icon
                as={BiCommentAdd}
                w={5}
                h={5}
                color="white"
                mr={2}

                // onClick={handleCommentClick}
              />
              <Text
                //  onClick={handleCommentClick}

                fontSize="sm"
                color="white"
              >
                Comment
              </Text>
            </Flex>
          </Box>
        </Flex>
        {/* {showCommentInput && (
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
              {feed.feed.comments.map((comment) => (
                <Box key={comment.itemId} p="2" my="2">
                  <Stack p={2} bg={bgColor} borderRadius={20}>
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
                      {comment.userId === user._id && (
                        <Menu>
                          <MenuButton as={Button} variant="ghost" size="sm">
                            <MoreVertIcon />
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Delete</MenuItem>
                          </MenuList>
                        </Menu>
                      )}
                    </Flex>
                    <Box p={3}>
                      <p>{comment.comment}</p>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Box>
          </>
        )} */}
      </Stack>
    </div>
  );
};

export default Post;
