import { Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
import logo from "../../assets/images/ecologo.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { logout, state } = useAuth();

  const signOut = () => {
    logout();
  };

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
      >
        <Link to="/">
          <Box>
            <Image src={logo} width="50px" />
          </Box>
        </Link>
        <Box>
          {state.accessToken ? (
            <Flex gap={5}>
              <Link to="/login">
                <Button onClick={signOut} className="btn" variant="unstyled">
                  logout
                </Button>
              </Link>
              <Link to="/post">
                <Button
                  className="btn"
                  borderWidth={1}
                  px={5}
                  borderRadius={20}
                  variant="unstyled"
                  w="120px"
                  _hover={{ transform: "scale(1.1)" }}
                >
                  Feed
                </Button>
              </Link>
            </Flex>
          ) : (
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
                  borderColor="white"
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
          )}
        </Box>
      </HStack>
    </nav>
  );
};

export default Navbar;
