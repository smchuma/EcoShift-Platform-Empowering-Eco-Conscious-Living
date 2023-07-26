/* eslint-disable react/prop-types */
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { BsFillMoonFill, BsFillSunFill, BsGear } from "react-icons/bs";
import { FaTrophy, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import PostModal from "../PostModal/PostModal";
import { MdPostAdd } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const DrawerComp = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const signOut = () => {
    logout();
  };
  const handleLinkClick = () => {
    onClose();
  };

  const btnRef = useRef();
  return (
    <>
      <Button ref={btnRef} variant="unstyled" onClick={onOpen}>
        <GiHamburgerMenu size={24} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Stack gap={5} mt="120px" align="center">
              <Link to="/post" onClick={handleLinkClick}>
                <Flex
                  w="200px"
                  cursor="pointer"
                  _hover={{ bg: "#177067" }}
                  py={2}
                  borderRadius="full"
                  px={5}
                  align="center"
                >
                  <AiFillHome size={24} />
                  <Text ml="15px">Posts</Text>
                </Flex>
              </Link>
              <Link to="/challenge" onClick={handleLinkClick}>
                <Flex
                  w="200px"
                  cursor="pointer"
                  _hover={{ bg: "#177067" }}
                  py={2}
                  borderRadius="full"
                  px={5}
                  align="center"
                >
                  <FaTrophy size={24} />

                  <Text ml="15px">Challenges</Text>
                </Flex>
              </Link>
              <Link to={`/profile/${user._id}`} onClick={handleLinkClick}>
                <Flex
                  w="200px"
                  cursor="pointer"
                  _hover={{ bg: "#177067" }}
                  py={2}
                  borderRadius="full"
                  px={5}
                  align="center"
                >
                  <FaUser size={24} />
                  <Text ml="15px">Profile</Text>
                </Flex>
              </Link>
              <Flex
                w="200px"
                cursor="pointer"
                _hover={{ bg: "#177067" }}
                py={2}
                borderRadius="full"
                px={5}
                align="center"
              >
                <BsGear size={24} />
                <Text ml="10px">Settings</Text>
              </Flex>
              <Flex
                w="200px"
                cursor="pointer"
                _hover={{ bg: "#177067" }}
                borderRadius="full"
                px={5}
                align="center"
              >
                <Button display="flex" variant="unstyled" onClick={signOut}>
                  <AiOutlineLogout size={24} />
                  <Text ml="10px">Logout</Text>
                </Button>
              </Flex>
              <Flex
                w="200px"
                cursor="pointer"
                borderRadius="full"
                px={5}
                align="center"
              >
                <Button
                  display="flex"
                  variant="unstyled"
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? (
                    <>
                      <BsFillMoonFill size={24} />
                      <Text ml="10px">Dark Mode</Text>
                    </>
                  ) : (
                    <>
                      <BsFillSunFill size={24} />
                      <Text ml="10px">Light Mode</Text>
                    </>
                  )}
                </Button>
              </Flex>

              <PostModal>
                <Flex
                  w="180px"
                  cursor="pointer"
                  bg="#177067"
                  _hover={{ transform: "scale(1.1)" }}
                  py={3}
                  borderRadius="full"
                  px={10}
                  align="center"
                  mt={5}
                  color="white"
                  transition="all 0.3s ease-in-out"
                >
                  <MdPostAdd size={24} />
                  <Text ml="10px">Post</Text>
                </Flex>
              </PostModal>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComp;
