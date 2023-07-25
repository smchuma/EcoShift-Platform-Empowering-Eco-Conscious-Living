/* eslint-disable react/prop-types */

import useTask from "../../hooks/useTask";
import { Stack, Text } from "@chakra-ui/react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import TaskPost from "../TaskPost/TaskPost";

const AboutMe = ({ dyUser, id }) => {
  const { tasks } = useTask();

  const getTasks = tasks.filter((task) => task?.userId === id);

  if (!tasks) {
    return <SkeletonLoader />;
  }

  return (
    <Stack>
      <Text>About Me</Text>
      <Text>{dyUser?.desc}</Text>
      <Stack w="80%" gap={20} pt={10} m="auto">
        {getTasks.length === 0 && (
          <Text textAlign="center" color="gray.500">
            There are no tasks yet
          </Text>
        )}
        {getTasks &&
          getTasks.map((task) => <TaskPost key={task?._id} task={task} />)}
      </Stack>
    </Stack>
  );
};

export default AboutMe;
