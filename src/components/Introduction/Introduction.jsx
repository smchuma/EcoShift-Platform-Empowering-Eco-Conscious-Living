/* eslint-disable react/no-unescaped-entities */
import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import pic1 from "../../assets/images/intropic.png";

const Introduction = () => {
  return (
    <Stack
      py="50px"
      color="black"
      direction={{ base: "column", lg: "row" }}
      bg="#F0EBE5"
      w="100%"
    >
      <Flex flex="1">
        <Stack px="50px" justify="center">
          <Text
            fontSize="40px"
            color="#517053"
            fontWeight="600"
            mb="20px"
            textAlign={{ base: "center", md: "start" }}
          >
            Embrace a Greener Tomorrow
          </Text>
          <Text textAlign="justify" fontSize="16px">
            Welcome to EcoShift, a vibrant community for eco-conscious
            individuals like you! Here, we believe that every small step towards
            sustainability counts. Whether you're a seasoned eco-warrior or just
            starting your journey towards greener living, you'll find a
            supportive space to share, learn, and inspire each other. Together,
            we can make a positive impact on our planet and future generations.
          </Text>
        </Stack>
      </Flex>
      <Flex flex="1">
        <Image mt="60px" src={pic1} w="100%" />
      </Flex>
    </Stack>
  );
};

export default Introduction;
