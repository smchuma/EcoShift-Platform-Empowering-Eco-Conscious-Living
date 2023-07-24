import { Box, Stack } from "@chakra-ui/react";
import { Profile } from "../../components";

const ProfilePage = () => {
  return (
    <Stack color="white" justifyContent="center">
      <Box width="100%" m={2}>
        <Box w="100%">
          <Profile />
        </Box>
      </Box>
    </Stack>
  );
};

export default ProfilePage;
