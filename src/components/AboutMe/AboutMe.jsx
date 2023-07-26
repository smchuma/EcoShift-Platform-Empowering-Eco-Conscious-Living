/* eslint-disable react/prop-types */

import useTask from "../../hooks/useTask";
import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import TaskPost from "../TaskPost/TaskPost";
import TaskInput from "../TaskInput/TaskInput";
import { MdPostAdd } from "react-icons/md";

const AboutMe = ({ dyUser }) => {
  const id = dyUser?._id;
  const { tasks } = useTask();

  if (!tasks) {
    return <SkeletonLoader />;
  }

  const getTasks = tasks.filter((task) => task?.userId === id);

  return (
    <Stack>
      {dyUser?.desc && (
        <Text fontSize="20px" my={2} mb={10} textAlign="center">
          {dyUser?.desc}
        </Text>
      )}
      <Stack w="90%" gap={5} m="auto">
        {dyUser._id === tasks[0].userId && (
          <Flex mb={5} justify="end">
            <TaskInput>
              <Flex
                w="180px"
                cursor="pointer"
                bg="#177067"
                _hover={{ transform: "scale(1.1)" }}
                py={3}
                borderRadius="full"
                px={10}
                align="center"
                mt={5}
                transition="all 0.3s ease-in-out"
              >
                <MdPostAdd color="white" size={24} />
                <Text color="white" ml="10px">
                  Add
                </Text>
              </Flex>
            </TaskInput>
          </Flex>
        )}
        <Box
          w="100%"
          h="10"
          border="1px solid"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={5}
        >
          <Text>Activities</Text>
        </Box>
        {getTasks.length === 0 && (
          <Text textAlign="center" color="gray.500">
            There are no activities logged yet
          </Text>
        )}
        {getTasks && (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={4} //
          >
            {getTasks
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((task) => (
                <Box key={task._id}>
                  <TaskPost task={task} />
                </Box>
              ))}
          </SimpleGrid>
        )}
      </Stack>
    </Stack>
  );
};

export default AboutMe;
