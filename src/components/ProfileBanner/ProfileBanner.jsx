import { useState } from "react";
import {
  Box,
  Image,
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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import useUser from "../../hooks/useUser";
import { AiFillCamera } from "react-icons/ai";
import { CLOUD_NAME, CLOUD_PRESET, CLOUD_URL } from "../../api_url/api";

const img = "https://via.placeholder.com/1500x300.png";

const ProfileBanner = ({ dyUser }) => {
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
      cloud.append("upload_preset", CLOUD_PRESET);
      cloud.append("cloud_name", CLOUD_NAME);
      const response = await fetch(CLOUD_URL, {
        method: "POST",
        body: cloud,
      });
      const data = await response.json();
      const coverPicture = data.secure_url;

      // Call the backend API to save the URL
      await updateUser.mutateAsync({ coverPicture });
      onClose();
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box w="100%" position="relative">
      <Image
        src={dyUser?.coverPicture || img}
        alt="Profile banner"
        w="100%"
        maxH={{
          base: "200px",
          md: "300px",
        }}
        objectFit="cover"
        boxSize={{
          base: "100%",
          md: "1500px",
        }}
      />
      <Flex justify="flex-end" position="absolute" top="10px" right="10px">
        {user?._id === dyUser?._id && (
          <IconButton
            icon={<AiFillCamera />}
            aria-label="Edit banner"
            color="brand.tomato"
            variant="unstyled"
            onClick={onOpen}
            borderRadius="50%"
          />
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Banner Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="20px">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview of selected banner image"
                  w="100%"
                />
              ) : (
                <Image
                  src={dyUser?.coverPicture || img}
                  alt="Current profile banner"
                  w="100%"
                />
              )}
            </Box>
            <Button
              as="label"
              htmlFor="banner-upload"
              variant="outline"
              mb="10px"
            >
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
ProfileBanner.propTypes = {
  imageUrl: PropTypes.string,
  onUpdateImage: PropTypes.func,
  dyUser:
    PropTypes.shape({
      coverPicture: PropTypes.string,
    }) || null,
};

export default ProfileBanner;
