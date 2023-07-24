import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import useUser from "../../hooks/useUser";
import { MdAddToPhotos } from "react-icons/md";
import { CLOUD_URL, CLOUD_NAME, CLOUD_PRESET } from "../../api_url/api";
import usePost from "../../hooks/usePost";

const ChallengePostModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { postPost } = usePost();
  const [desc, setDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreviewUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cloud = new FormData();
      cloud.append("file", selectedFile);
      cloud.append("upload_preset", CLOUD_PRESET);
      cloud.append("cloud_name", CLOUD_NAME);
      const response = await fetch(CLOUD_URL, {
        method: "POST",
        body: cloud,
      });
      const data = await response.json();
      const img = data.secure_url;

      // Call the backend API to save the URL
      await postPost.mutateAsync({ desc, img });

      setDesc("");
      setSelectedFile(null);
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
                  <Text fontSize="md">Create a post</Text>
                  <Textarea
                    placeholder="Enter text here..."
                    h="200px"
                    w="100%"
                    border={0}
                    onChange={(e) => setDesc(e.target.value)}
                    focusBorderColor="transparent"
                  />

                  <Flex mb={5} w="100%" gap={5}>
                    <Button
                      as="label"
                      w="100%"
                      leftIcon={<MdAddToPhotos />}
                      htmlFor="banner-upload"
                      variant="outlined"
                      textAlign="center"
                    >
                      {selectedFile ? "Change Image" : "Upload Image"}
                    </Button>
                    <input
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                  </Flex>
                  {selectedFile && (
                    <Flex
                      p={5}
                      w="100%"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {imagePreviewUrl && (
                        <img
                          src={imagePreviewUrl}
                          alt="Img"
                          style={{ maxWidth: "100%" }}
                        />
                      )}
                    </Flex>
                  )}
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button
                  w="150px"
                  type="submit"
                  color="white"
                  bg="#177067"
                  mr={3}
                  onClick={onClose}
                >
                  Post
                </Button>
              </ModalFooter>
            </form>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
ChallengePostModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChallengePostModal;
