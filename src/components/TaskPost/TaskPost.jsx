/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Input,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";

const TaskPost = ({ task }) => {
  return (
    <Stack
      w="100%"
      gap={4}
      borderRadius="md"
      display="flex"
      justifyContent="center"
    >
      <Text>Activity: {task?.task}</Text>
      <Flex justify="space-between">
        <Text>Achieved: {task.achieved}</Text>
      </Flex>

      <Box>
        <Text>
          Status:{" "}
          {task.status === "completed"
            ? "Completed"
            : task.status === "in-progress"
            ? "In Progress"
            : "Not Started"}
        </Text>
      </Box>
      <Box>
        <Text>
          Created on:{" "}
          {task?.dateTime.split("T")[0].split("-").reverse().join("-")}
        </Text>
      </Box>
      <Progress
        colorScheme="green"
        size="lg"
        value={(task.achieved / task.target) * 100}
      />
      <Flex justify="space-between">
        <Input w="250px" placeholder="Enter achieved:" />
        <Button
          bg="teal"
          variant="unstyled"
          color="white"
          px={4}
          // onClick={handleLogEvent}
        >
          Log Event
        </Button>
      </Flex>
    </Stack>
  );
};

export default TaskPost;
