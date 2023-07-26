import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import useUser from "../../hooks/useUser";
import useTask from "../../hooks/useTask";

const TaskInput = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { postTask } = useTask();
  const [task, setTask] = useState("");
  const [target, setTarget] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onClose();
      await postTask.mutateAsync({ task, target, dateTime });
      setTask("");
      setTarget("");
      setDateTime("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {children && <span onClick={onOpen}>{children}</span>}

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader>
            <Flex align="center">
              <Avatar
                size="sm"
                name={user.firstName + " " + user.lastName}
                src={user?.profilePicture}
              />
              <Text ml={2} fontSize="sm" fontWeight="bold">
                {user.firstName + " " + user.lastName}
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <Box>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <VStack spacing="1rem" alignItems="flex-start" w="100%">
                  <Text fontSize="md">Create an Activity</Text>

                  <Stack w="100%" spacing="4">
                    <FormControl>
                      <FormLabel>Task</FormLabel>
                      <Input
                        type="text"
                        name="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Target</FormLabel>
                      <Input
                        type="number"
                        name="target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Date and Time</FormLabel>
                      <Input
                        type="datetime-local"
                        name="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Stack>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  w="100%"
                  type="submit"
                  color="white"
                  bg="#177067"
                  mr={3}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </ModalFooter>
            </form>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
TaskInput.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskInput;
