import { Box, Stack, Text } from "@chakra-ui/react";
import FeaturesGrid from "../FeaturesGrid/FeaturesGrid";

const Features = () => {
  return (
    <Stack py="50px" bg="#F0EBE5">
      <Text
        px="50px"
        fontSize="40px"
        color="#517053"
        fontWeight="600"
        mb="80px"
      >
        Features Highlights
      </Text>
      <Box pb="100px" px={{ base: "0px", md: "120px" }}>
        <FeaturesGrid />
      </Box>
    </Stack>
  );
};

export default Features;
