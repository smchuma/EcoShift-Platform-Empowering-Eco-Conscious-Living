import { Box, Stack } from "@chakra-ui/react";
import { Header, Post } from "../../components";

const Feed = () => {
  return (
    <Stack color="white">
      <Box mt={2}>
        <Header />
      </Box>
      <Stack w="90%" gap={20} pt={10} m="auto">
        <Post />
        <Post />
      </Stack>
    </Stack>
  );
};

export default Feed;
