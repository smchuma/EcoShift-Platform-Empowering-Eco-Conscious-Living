/* eslint-disable react/no-unescaped-entities */
import { Button, Stack, Text } from "@chakra-ui/react";

const CallToAction = () => {
  return (
    <Stack
      align="center"
      bg="#F0EBE5"
      w="100%"
      h={{ base: "auto", lg: "70vh" }}
    >
      <Text
        px="50px"
        fontSize="40px"
        color="#01c19d"
        fontWeight="600"
        mb="10px"
        pt="100px"
        textAlign="center"
      >
        Ready to make a difference?
      </Text>
      <Text px="120px" color="black" fontSize="23px" textAlign="center">
        Join our eco-conscious community today and take the first step towards a
        greener tomorrow. Click 'Get Started' to embark on your sustainable
        journey!
      </Text>
      <Button
        w="200px"
        variant="unstyled"
        borderWidth={1}
        borderColor="#038C73"
        _hover={{ transform: "scale(1.1)" }}
        mt="20px"
        borderRadius="20px"
      >
        Get Started
      </Button>
    </Stack>
  );
};

export default CallToAction;
