import { Box, Skeleton, Stack } from "@chakra-ui/react";

const SkeletonLoader = () => {
  return (
    <Stack h="100vh" p="20px" w="100%" bg="transparent">
      <Box
        h="100%"
        w="100%"
        opacity="0.5"
        borderRadius="md"
        boxShadow="md"
        p={22}
      >
        <Skeleton height="50px" mb="4" />
        <Skeleton height="10vh" mb="4" />
        <Skeleton height="20vh" mb="4" />
        <Skeleton height="20vh" mb="4" />
        <Skeleton height="10vh" mb="4" />
        <Skeleton height="10vh" mb="4" />
      </Box>
    </Stack>
  );
};

export default SkeletonLoader;
