import { Box, Stack, Text } from "@chakra-ui/react";
import { FeedPost, SkeletonLoader } from "../../components";
import usePost from "../../hooks/usePost";

const Challenge = () => {
  const { posts } = usePost();

  if (!posts) {
    return <SkeletonLoader />;
  }

  return (
    <Stack>
      <Stack w="80%" gap={20} pt={10} m="auto">
        {posts.length === 0 && (
          <Text textAlign="center" color="gray.500">
            There are no posts yet
          </Text>
        )}
        {posts &&
          posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <Box key={post._id}>
                <FeedPost post={post} />
              </Box>
            ))}
      </Stack>
    </Stack>
  );
};

export default Challenge;
