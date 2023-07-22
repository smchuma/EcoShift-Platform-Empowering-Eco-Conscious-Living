import { Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/images/ecologo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <HStack
        bg="#01836d"
        w="100%"
        justify="space-between"
        py="15px"
        px={{ base: "40px", md: "50px" }}
        pos="fixed"
        zIndex={20}
        top={0}
        // boxShadow="0px 2px 4px rgba(2, 89, 81, 0.2)"
      >
        <Link to="/">
          <Box>
            <Image src={logo} width="50px" />
          </Box>
        </Link>
        <Box>
          <Flex gap={5}>
            <Link to="/login">
              <Button className="btn" variant="unstyled">
                login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className="btn"
                borderWidth={1}
                px={5}
                borderRadius={20}
                variant="unstyled"
                w="120px"
                _hover={{ transform: "scale(1.1)" }}
              >
                register
              </Button>
            </Link>
          </Flex>
        </Box>
      </HStack>
    </nav>
  );
};

export default Navbar;
