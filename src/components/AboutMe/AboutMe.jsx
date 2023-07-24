/* eslint-disable react/prop-types */

import { Stack, Text } from "@chakra-ui/react";

const AboutMe = ({ dyUser }) => {
  console.log("dyUser", dyUser);

  return (
    <Stack>
      <Text>About Me</Text>
      <Text>{dyUser?.desc}</Text>
    </Stack>
  );
};

export default AboutMe;
