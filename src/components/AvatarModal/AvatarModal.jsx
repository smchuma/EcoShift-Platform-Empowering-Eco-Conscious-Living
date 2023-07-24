import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { AiFillCamera } from "react-icons/ai";
import useUser from "../../hooks/useUser";

const AvatarModal = ({ dyUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user, updateUser } = useUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
    }
  };

  const handleImageUpdate = async (e) => {
    e.preventDefault();
    try {
      const cloud = new FormData();
      cloud.append("file", selectedFile);
      cloud.append("upload_preset", "scholar");
      cloud.append("cloud_name", "egfscholar");
      onClose();
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/egfscholar/image/upload",
        {
          method: "POST",
          body: cloud,
        }
      );

      const data = await response.json();
      const profilePicture = data.secure_url;

      // Call the backend API to save the URL
      await updateUser.mutateAsync({ profilePicture });
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box cursor="pointer" w="100%" position="relative">
      <Avatar
        name={`${dyUser?.firstName} ${dyUser?.lastName}`}
        src={dyUser?.profilePicture}
        alt="Avatar"
        size="2xl"
        onClick={onOpen}
      >
        {user?._id === dyUser?._id && (
          <IconButton
            aria-label="Edit Profile Photo"
            icon={<AiFillCamera />}
            onClick={onOpen}
            position="absolute"
            bottom="0"
            right="0"
            size="sm"
            color="brand.secondary"
            borderRadius="50%"
            backgroundColor={bgColor}
          />
        )}
      </Avatar>
      {user?._id === dyUser?._id && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile Photo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex align="center" justify="center" mb="20px">
                {previewUrl ? (
                  <Avatar
                    name={`${dyUser?.firstName} ${dyUser?.lastName}`}
                    src={previewUrl}
                    alt="Avatar"
                    size="2xl"
                    onClick={onOpen}
                    mb={5}
                  />
                ) : (
                  <Avatar
                    name={`${dyUser?.firstName} ${dyUser?.lastName}`}
                    src={dyUser?.profilePicture}
                    alt="Avatar"
                    size="2xl"
                    onClick={onOpen}
                  />
                )}
              </Flex>
              <Flex mb={5} justify="center" align="center" gap={5}>
                <Button as="label" htmlFor="banner-upload" variant="outline">
                  {selectedFile ? "Change Image" : "Upload Image"}
                </Button>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {selectedFile && (
                  <Button onClick={handleImageUpdate}>Save Changes</Button>
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

AvatarModal.propTypes = {
  imageUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onUpdateImage: PropTypes.func,
  dyUser:
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      profilePicture: PropTypes.string,
    }) || null,
};

export default AvatarModal;
