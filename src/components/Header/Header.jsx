import { Flex, Stack, Text } from "@chakra-ui/react";
import ChallengePostModal from "../ChallengePostModal/ChallengePostModal";

const Header = () => {
  return (
    <Stack
      borderRadius="md"
      direction="row"
      align="center"
      w="98%"
      m="auto"
      p={8}
      borderBottom="1px solid "
      borderColor="#10413c"
      justify="space-between"
    >
      <Text>Challenges</Text>
      <ChallengePostModal>
        <Flex
          px={5}
          cursor="pointer"
          bg="#177067"
          _hover={{ transform: "scale(1.1)" }}
          py={3}
          borderRadius="full"
          align="center"
          transition="all 0.3s ease-in-out"
        >
          <Text fontWeight="300" textAlign="center">
            Create challenge
          </Text>
        </Flex>
      </ChallengePostModal>
    </Stack>
  );
};

export default Header;
