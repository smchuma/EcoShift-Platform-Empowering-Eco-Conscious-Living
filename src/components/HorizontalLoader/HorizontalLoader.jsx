import { Box, Progress } from "@chakra-ui/react";

const HorizontalLoader = () => {
  return (
    <>
      <Box zIndex={50} position="fixed" top="0" left="0" right="0">
        <Progress size="xs" isIndeterminate />
      </Box>
    </>
  );
};

export default HorizontalLoader;
