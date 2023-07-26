import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import useUser from "../../hooks/useUser";
import { GiHamburgerMenu } from "react-icons/gi";
import DrawerComp from "../DrawerComp/DrawerComp";

const DashNav = () => {
  const { user } = useUser;

  return (
    <Stack direction={"row"} justify={"space-between"} p={5}>
      <Flex>
        <DrawerComp>
          <GiHamburgerMenu size={24} />
          ss
        </DrawerComp>
      </Flex>
      {user && (
        <Flex>
          <Avatar
            src={user?.profilePicture}
            name={user?.firstName + " " + user?.lastName}
            size={"md"}
          />
          <Text>{`${user?.firstName
            .charAt(0)
            .toUpperCase()}${user?.firstName.slice(1)} ${user?.lastName
            .charAt(0)
            .toUpperCase()}${user?.lastName.slice(1)}`}</Text>
        </Flex>
      )}
    </Stack>
  );
};

export default DashNav;
