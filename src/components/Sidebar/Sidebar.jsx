import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { MdPostAdd } from "react-icons/md";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { PostModal } from "..";

const Sidebar = () => {
  const { logout } = useAuth();
  const { user } = useUser();

  const signOut = () => {
    logout();
  };

  return (
    <Box pt="80px" w="100%">
      <Flex justify="center" pb="40px">
        <Link to="/feed">
          <Box rounded="full" p="2px" borderWidth={1} borderColor="#177067">
            <Avatar
              size="2xl"
              name={user.firstName + " " + user.lastName}
              src={user.profilePicture}
            />
          </Box>
        </Link>
      </Flex>
      <Stack gap={5} align="center">
        <Flex
          w="200px"
          cursor="pointer"
          _hover={{ bg: "#177067" }}
          py={2}
          borderRadius="full"
          px={10}
          align="center"
        >
          <FaUser size={24} />
          <Text ml="15px">Profile</Text>
        </Flex>
        <Flex
          w="200px"
          cursor="pointer"
          _hover={{ bg: "#177067" }}
          py={2}
          borderRadius="full"
          px={10}
          align="center"
        >
          <BsGear size={24} />
          <Text ml="10px">Settings</Text>
        </Flex>
        <Flex
          w="200px"
          cursor="pointer"
          _hover={{ bg: "#177067" }}
          py={2}
          borderRadius="full"
          px={10}
          align="center"
        >
          <Button display="flex" variant="unstyled" onClick={signOut}>
            <AiOutlineLogout size={24} />
            <Text ml="10px">Logout</Text>
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
            transition="all 0.3s ease-in-out"
          >
            <MdPostAdd size={24} />
            <Text ml="10px">Post</Text>
          </Flex>
        </PostModal>
      </Stack>
    </Box>
  );
};

export default Sidebar;
