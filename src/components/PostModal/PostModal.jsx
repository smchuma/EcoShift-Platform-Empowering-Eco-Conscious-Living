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
import useFeed from "../../hooks/useFeed";
import { MdAddToPhotos } from "react-icons/md";

const PostModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { postFeed } = useFeed();
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
      cloud.append("upload_preset", "scholar");
      cloud.append("cloud_name", "egfscholar");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/egfscholar/image/upload",
        {
          method: "POST",
          body: cloud,
        }
      );
      const data = await response.json();
      const img = data.secure_url;

      // Call the backend API to save the URL
      const result = await postFeed.mutateAsync({ desc, img });
      console.log(result);
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
          <ModalHeader bg="#428C7F" color="white">
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
              <ModalBody bg="#428C7F">
                <VStack
                  spacing="1rem"
                  alignItems="flex-start"
                  w="100%"
                  p="1rem"
                >
                  <Textarea
                    placeholder="What's on your mind?"
                    h="200px"
                    w="100%"
                    border={0}
                    onChange={(e) => setDesc(e.target.value)}
                    focusBorderColor="transparent"
                    _placeholder={{ color: "white" }}
                  />

                  <Flex mb={5} w="100%" gap={5}>
                    <Button
                      as="label"
                      w="100%"
                      leftIcon={<MdAddToPhotos />}
                      htmlFor="banner-upload"
                      variant="outlined"
                      textAlign="center"
                      color="white"
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

              <ModalFooter bg="#428C7F">
                <Button
                  w="150px"
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  onClick={onClose}
                  bg="#177067"
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
PostModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostModal;
