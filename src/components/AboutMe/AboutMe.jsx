/* eslint-disable react/prop-types */

import useTask from "../../hooks/useTask";

import { Stack, Text } from "@chakra-ui/react";

const AboutMe = ({ dyUser }) => {
  const { tasks } = useTask();

  console.log(tasks);
  return (
    <Stack>
      <Text>About Me</Text>
      <Text>{dyUser?.desc}</Text>
    </Stack>
  );
};

export default AboutMe;
