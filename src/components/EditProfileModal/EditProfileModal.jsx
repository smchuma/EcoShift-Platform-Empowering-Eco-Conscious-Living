import {
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
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useUser from "../../hooks/useUser";

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, updateUser } = useUser();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    desc: user?.desc || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      onClose();
      await updateUser.mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box cursor="pointer" w="100%" position="relative">
      <Flex align="center">
        <Button
          width={{
            base: "200px",
            md: "auto",
          }}
          onClick={onOpen}
          colorScheme="white"
          variant="outline"
          mt={3}
        >
          Edit Profile
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Stack as="form" gap={8}>
                <Box>
                  <Box fontWeight="semibold" mb="1">
                    Basic Info
                  </Box>
                  <FormControl id="firstName">
                    <FormLabel mt={5} mb={3}>
                      First Name
                    </FormLabel>
                    <Input
                      value={formData.firstName}
                      onChange={handleChange}
                      name="firstName"
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="lastName">
                    <FormLabel my={3}>Last Name</FormLabel>
                    <Input
                      value={formData.lastName}
                      onChange={handleChange}
                      name="lastName"
                      type="text"
                    />
                  </FormControl>
                  <FormControl id="desc" my={3}>
                    <FormLabel>About Me</FormLabel>
                    <Input
                      value={formData.desc}
                      onChange={handleChange}
                      name="desc"
                      type="text"
                    />
                  </FormControl>
                </Box>
              </Stack>
            </>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditProfileModal;
