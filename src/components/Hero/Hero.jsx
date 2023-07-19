import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import eco from "../../assets/images/eco.png";
import logo from "../../assets/images/ecologo.png";
import leaf from "../../assets/images/try2.png";

const Hero = () => {
  return (
    <Stack overflow="hidden" direction="row" bg="#008872" w="100%" h="90vh">
      <Flex flex="1" justify="center">
        <Image mt="60px" src={eco} w="80%" h="80%" />
      </Flex>
      <Flex flex="1" flexDir="column" pos="relative">
        <Stack zIndex={10} mt="100px" align="center">
          <Image src={logo} width="150px" />

          <Text color="white" fontWeight="600" fontSize="40px">
            Join the Green Movement
          </Text>
          <Text textAlign="center" fontSize="30px" color="#e2ffa2">
            Your Platform <br /> for Eco-Conscious Living
          </Text>
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
        </Stack>
        <Image top={350} left={250} pos="absolute" src={leaf} width="100%" />
      </Flex>
    </Stack>
  );
};

export default Hero;
