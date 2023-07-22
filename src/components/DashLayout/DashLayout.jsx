import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import RightBar from "../RightBar/RightBar";

const DashLayout = () => {
  return (
    <>
      <Flex bg="#07261b">
        <Box
          bg="#428C7F"
          color="white"
          h="100vh"
          w="220px"
          display={{ base: "none", md: "block" }}
          pos="fixed"
        >
          <Sidebar />
        </Box>

        <Box flex="1" ml={{ base: "0", md: "220px" }} mr={{ md: "520px" }}>
          <Outlet />
        </Box>

        <Box
          w="500px"
          pos="fixed"
          right="20px"
          display={{ base: "none", md: "block" }}
        >
          <RightBar />
        </Box>
      </Flex>
    </>
  );
};

export default DashLayout;
