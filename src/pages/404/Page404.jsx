/* eslint-disable react/no-unescaped-entities */
import { Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <Stack w="100%" h="100vh" align="center" justify="center">
      <Text fontSize="50px">Can't Find Your Page</Text>
      <Link to="/">
        <Button variant="outlined">Go Back</Button>
      </Link>
    </Stack>
  );
};

export default Page404;
