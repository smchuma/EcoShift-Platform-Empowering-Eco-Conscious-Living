import { Box, Stack, Text } from "@chakra-ui/react";
import SuggestedUser from "../SuggestedUsers/SuggestedUsers";

const RightBar = () => {
  const isOnline = true;
  return (
    <Stack spacing={4}>
      <Text
        fontSize="xl"
        fontWeight="500"
        borderColor="gray.100"
        mt="40px"
        textAlign="left"
        px="120px"
      >
        EcoHearts
      </Text>
      <Box
        px="100px"
        mt="20px"
        flex={1}
        w="100%"
        display={{ base: "none", lg: "block" }}
      >
        <SuggestedUser isOnline={isOnline} />
      </Box>
    </Stack>
  );
};

export default RightBar;
