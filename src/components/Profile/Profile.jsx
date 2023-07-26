import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AvatarModal from "../AvatarModal/AvatarModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProfileBanner from "../ProfileBanner/ProfileBanner";
import useUser from "../../hooks/useUser";
import AboutMe from "../AboutMe/AboutMe";
import usePost from "../../hooks/usePost";
import FeedPost from "../FeedPost/FeedPost";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const Profile = () => {
  const { id } = useParams();
  const { user, allUsers } = useUser();
  const dyUser = allUsers?.find((user) => user?._id === id);
  const { posts } = usePost();

  if (!posts) {
    return <SkeletonLoader />;
  }

  const getPosts = posts.filter((post) => post?.userId === id);

  if (!dyUser) {
    return <SkeletonLoader />;
  }

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
          pb={5}
          borderBottom="1px solid #e4e4e4"
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
      <Box>
        <AboutMe dyUser={dyUser} />
      </Box>
      <Box>
        <Box
          w="80%"
          h="10"
          m="auto"
          mt="60px"
          mb="20px"
          border="1px solid"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>My Posts</Text>
        </Box>
        <Stack w="80%" gap={20} pt={5} m="auto">
          {getPosts.length === 0 && (
            <Text textAlign="center" color="gray.500">
              There are no posts yet
            </Text>
          )}
          {getPosts &&
            getPosts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post) => (
                <Box key={post._id}>
                  <FeedPost post={post} />
                </Box>
              ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Profile;
