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
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidGroup } from "react-icons/bi";
import { BiCommentAdd } from "react-icons/bi";
import useUser from "../../hooks/useUser";
import useFeed from "../../hooks/useFeed";
import { MdOutlineDeleteForever } from "react-icons/md";

const Post = (feed) => {
  const { user } = useUser();
  const { deleteFeed, likeFeed, commentFeed } = useFeed();
  const isLiked = feed.feed.likes.includes(user._id);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  const firstName = `${feed.feed.user.firstName
    .charAt(0)
    .toUpperCase()}${feed.feed.user.firstName.slice(1)}`;
  const lastName = `${feed.feed.user.lastName
    .charAt(0)
    .toUpperCase()}${feed.feed.user.lastName.slice(1)}`;

  const handleDelete = async () => {
    try {
      await deleteFeed.mutate(feed.feed._id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoin = () => {
    if (!isLiked) {
      likeFeed.mutate({ postId: feed.feed._id, userId: feed.feed.userId });
    }
  };

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    commentFeed.mutate({
      postId: feed.feed._id,
      comment,
    });
    setComment("");
  };

  return (
    <div>
      <Stack
        cursor="pointer"
        borderBottom="2px solid #bebebe"
        pb={5}
        backgroundColor="transparent"
      >
        <Flex justify="end">
          {feed.feed.userId === user._id && (
            <Icon
              as={MdOutlineDeleteForever}
              w={5}
              h={5}
              _hover={{ color: "red.500" }}
              onClick={handleDelete}
            />
          )}
        </Flex>
        <Box>
          {feed.feed.img && (
            <Box mt={4}>
              <Image
                src={feed.feed.img}
                borderRadius="md"
                alt=""
                boxSize="100%"
                objectFit="cover"
              />
            </Box>
          )}
        </Box>
        <Flex px={4} mt="20px" justify="space-between">
          <Flex align="center">
            <Button
              bg={isLiked ? "gray.700" : "#177067"}
              color="white"
              fontWeight="300"
              onClick={handleJoin}
              w="100px"
              _hover={{ transform: "scale(1.05)" }}
            >
              {isLiked ? "Joined" : "Join"}
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
              <Icon as={BiSolidGroup} w={5} h={5} mr={2} />
              <Text fontSize="sm">{feed.feed.likes.length} participants</Text>
            </Box>
            <Box mr={5}>
              <Text fontSize="sm" color="brand.secondary">
                {feed.feed.comments.length} comments
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Stack mt={4} borderTopWidth="1px" borderTopColor="#bebebe">
          <Box mt={4}>
            <Text>{feed.feed.title}</Text>
          </Box>
          <Box mt={2}>
            <Text fontSize="sm">{feed.feed.desc}</Text>
          </Box>
          {feed.feed.link && (
            <Box mt={2}>
              <Link href={feed.feed.link} isExternal>
                <Text fontSize="sm">Tutorial Link</Text>
              </Link>
            </Box>
          )}
          <Flex pt={4} align="center" mt={2}>
            <Text fontSize="sm" color="gray.800">
              Created by:
            </Text>
            <Text ml={2} fontSize="sm" color="gray.800">
              {firstName + " " + lastName}
            </Text>
          </Flex>
        </Stack>
        <Flex mt={5} alignItems="center" justify="center">
          <Box>
            <Flex align="center">
              <Icon
                as={BiCommentAdd}
                w={5}
                h={5}
                mr={2}
                onClick={handleCommentClick}
              />
              <Text onClick={handleCommentClick} fontSize="sm">
                Comment
              </Text>
            </Flex>
          </Box>
        </Flex>
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
              {feed.feed.comments.map((comment) => (
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

export default Post;
