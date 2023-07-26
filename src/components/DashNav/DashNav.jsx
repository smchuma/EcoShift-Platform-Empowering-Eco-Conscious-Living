/* eslint-disable react/prop-types */
import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import DrawerComp from "../DrawerComp/DrawerComp";

const DashNav = ({ user }) => {
  return (
    <Stack direction={"row"} justify={"space-between"} p={5}>
      {user && (
        <Flex align="center" gap={2}>
          <Avatar
            src={user?.profilePicture}
            name={user?.firstName + " " + user?.lastName}
            size={"sm"}
          />
          <Text fontSize="sm">{`${user?.firstName
            .charAt(0)
            .toUpperCase()}${user?.firstName.slice(1)} ${user?.lastName
            .charAt(0)
            .toUpperCase()}${user?.lastName.slice(1)}`}</Text>
        </Flex>
      )}
      <Flex align="center">
        <DrawerComp user={user} />
      </Flex>
    </Stack>
  );
};

export default DashNav;
