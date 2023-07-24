import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AvatarModal from "../AvatarModal/AvatarModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProfileBanner from "../ProfileBanner/ProfileBanner";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const { id } = useParams();
  const { user, allUsers } = useUser();
  const dyUser = allUsers?.find((user) => user?._id === id);

  const firstName = `${dyUser?.firstName
    .charAt(0)
    .toUpperCase()}${dyUser?.firstName.slice(1)}`;
  const lastName = `${dyUser?.lastName
    .charAt(0)
    .toUpperCase()}${dyUser?.lastName.slice(1)}`;

  return (
    <Stack direction="column">
      <Box w="100%" mb={4}>
        <ProfileBanner dyUser={dyUser} />
        <Flex
          justify="space-between"
          align="center"
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Flex
            align="center"
            flexDirection={{
              base: "column",
              md: "row",
            }}
          >
            <Box
              ml={{
                base: 0,
                md: 5,
              }}
              mt="-30px"
            >
              <AvatarModal dyUser={dyUser} />
            </Box>
            <Box
              ml={{
                base: 0,
                md: 3,
              }}
            >
              <Heading
                fontSize="2xl"
                mt={{
                  base: 2,
                  md: 0,
                }}
                size="lg"
              >
                {firstName} {lastName}
              </Heading>
            </Box>
          </Flex>
          <Box>{user?._id === dyUser?._id && <EditProfileModal />}</Box>
        </Flex>
      </Box>
    </Stack>
  );
};

export default Profile;
