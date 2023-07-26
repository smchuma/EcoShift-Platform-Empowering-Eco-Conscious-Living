/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useTask from "../../hooks/useTask";
import { MdDelete } from "react-icons/md";
import useUser from "../../hooks/useUser";

const TaskPost = ({ task }) => {
  const { updateTask, deleteTask } = useTask();
  const [achieved, setAchieved] = useState("");
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedAchieved = parseInt(achieved, 10);
    if (
      isNaN(parsedAchieved) ||
      parsedAchieved < 0 ||
      parsedAchieved.toString() !== achieved
    ) {
      alert("Invalid input. Please enter a valid positive integer.");
      return;
    }

    if (task.achieved >= task.target) {
      alert("Task already completed.");
      setAchieved("");
      return;
    }

    try {
      const newAchieved = task.achieved + parsedAchieved;
      const variables = {
        id: task?._id,
        data: { achieved: newAchieved },
      };

      await updateTask.mutateAsync(variables);
      setAchieved("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask.mutateAsync(task?._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      w="100%"
      gap={4}
      borderRadius="20px"
      display="flex"
      justifyContent="center"
      mb="50px"
      borderWidth={2}
      p={5}
    >
      <Flex justify="space-between">
        <Text fontWeight="bold">{task.task}</Text>
        <Flex cursor="pointer" align="center" gap={3}>
          {task?.userId === user?._id && (
            <Icon
              as={MdDelete}
              boxSize={5}
              _hover={{ color: "red" }}
              onClick={handleDelete}
            />
          )}
        </Flex>
      </Flex>
      <Box>
        <Text mb={2}>Target to reach: {task.target}</Text>
        <Text>Achieved: {task.achieved}</Text>
      </Box>

      <Flex gap={2}>
        <Text>Status: </Text>
        <Text
          color={
            task.achieved >= task.target
              ? "green"
              : task.status === "In Progress"
              ? "red"
              : "red"
          }
        >
          {task.achieved >= task.target
            ? "Completed"
            : task.status === "In Progress"
            ? "In Progress"
            : "Not Started"}
        </Text>
      </Flex>
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
      {task?.userId === user?._id && (
        <Flex gap={5} justify="space-between">
          <Input
            value={achieved}
            onChange={(e) => setAchieved(e.target.value)}
            w="250px"
            placeholder="Enter achieved:"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
          <Button
            variant="unstyled"
            color={task.achieved >= task.target ? "gray.400" : "teal"}
            px={6}
            fontSize="18px"
            onClick={task.achieved >= task.target ? null : handleSubmit}
          >
            add
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export default TaskPost;
