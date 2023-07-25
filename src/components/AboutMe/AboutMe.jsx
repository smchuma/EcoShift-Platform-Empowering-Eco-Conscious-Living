/* eslint-disable react/prop-types */

import useTask from "../../hooks/useTask";
import { Box, Stack, Text } from "@chakra-ui/react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import TaskPost from "../TaskPost/TaskPost";

const AboutMe = ({ dyUser }) => {
  const id = dyUser?._id;
  const { tasks } = useTask();

  if (!tasks) {
    return <SkeletonLoader />;
  }

  const getTasks = tasks.filter((task) => task?.userId === id);

  return (
    <Stack>
      <Text>About Me</Text>
      <Text>{dyUser?.desc}</Text>
      <Stack w="90%" gap={5} pt={10} m="auto">
        {getTasks.length === 0 && (
          <Text textAlign="center" color="gray.500">
            There are no tasks yet
          </Text>
        )}
        <Box
          w="100%"
          h="10"
          border="1px solid"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>Activities</Text>
        </Box>
        {getTasks &&
          getTasks.map((task) => <TaskPost key={task?._id} task={task} />)}
      </Stack>
    </Stack>
  );
};

export default AboutMe;
