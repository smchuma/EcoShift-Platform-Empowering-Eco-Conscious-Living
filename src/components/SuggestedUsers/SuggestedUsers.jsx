import { Avatar, AvatarBadge, Box, Stack, Text } from "@chakra-ui/react";

import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import useUser from "../../hooks/useUser";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SuggestedUser = ({ isOnline }) => {
  const { user, allUsers, allLoading } = useUser();

  if (!user || !allUsers) return <SkeletonLoader />;

  const filteredUsers = allUsers.filter((allUser) => allUser._id !== user._id);

  return (
    <>
      {allLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <Box>
            {filteredUsers.slice(0, 6).map((user) => (
              <Link to={`/profile/${user._id}`} key={user._id}>
                <Stack
                  direction="row"
                  spacing={4}
                  align="center"
                  mb={10}
                  cursor="pointer"
                >
                  <Avatar
                    size="md"
                    name={user.firstName + " " + user.lastName}
                    src={user?.profilePicture}
                  >
                    {isOnline && <AvatarBadge boxSize="1em" bg="green.500" />}
                  </Avatar>
                  <Text>{user.firstName + " " + user.lastName}</Text>
                </Stack>
              </Link>
            ))}
          </Box>
        </>
      )}
    </>
  );
};
SuggestedUser.propTypes = {
  isOnline: PropTypes.bool,
};

export default SuggestedUser;
