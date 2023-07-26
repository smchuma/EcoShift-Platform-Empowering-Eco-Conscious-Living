import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import eco from "../../assets/images/cc2.png";
import logo from "../../assets/images/ecologo.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Stack
      overflow="hidden"
      direction="row"
      bg="#008872"
      w="100%"
      h={{ base: "80vh", lg: "90vh" }}
    >
      <Flex
        align="center"
        flex="1"
        display={{ base: "none", lg: "flex" }}
        justify="center"
      >
        <Box w="80%">
          <Image src={eco} w="100%" objectFit={"cover"} />
        </Box>
      </Flex>
      <Flex flex="1" flexDir="column" pos="relative">
        <Stack mt="100px" align="center">
          <Image src={logo} width="150px" />

          <Text
            color="white"
            fontWeight="600"
            textAlign="center"
            fontSize="40px"
          >
            Join the Green Movement
          </Text>
          <Text
            textAlign="center"
            fontSize={{ base: "22px", md: "30px" }}
            color="#e2ffa2"
          >
            Your Platform <br /> for Eco-Conscious Living
          </Text>
          <Link to="/register">
            <Button
              className="btn"
              borderWidth={1}
              px={5}
              mt={5}
              borderRadius={20}
              variant="unstyled"
              w="160px"
              _hover={{ transform: "scale(1.1)" }}
            >
              Join Now
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Hero;
