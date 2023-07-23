import { Stack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Stack
      borderRadius="md"
      w="98%"
      m="auto"
      p={8}
      borderBottom="1px solid "
      borderColor="#10413c"
    >
      <Text>Challenges</Text>
    </Stack>
  );
};

export default Header;
