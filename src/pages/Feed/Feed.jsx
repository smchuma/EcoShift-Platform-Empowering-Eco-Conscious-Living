import { Box, Stack, Text } from "@chakra-ui/react";
import { Header, Post, SkeletonLoader } from "../../components";
import useFeed from "../../hooks/useFeed";

const Feed = () => {
  const { feeds } = useFeed();

  if (!feeds) {
    return <SkeletonLoader />;
  }

  return (
    <Stack color="white">
      <Box mt={2}>
        <Header />
      </Box>
      <Stack w="90%" gap={20} pt={10} m="auto">
        {feeds.length === 0 && (
          <Text textAlign="center" color="gray.500">
            There are no challenges yet
          </Text>
        )}
        {feeds &&
          feeds
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((feed) => (
              <Box key={feed._id}>
                <Post feed={feed} />
              </Box>
            ))}
      </Stack>
    </Stack>
  );
};

export default Feed;
