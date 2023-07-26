/* eslint-disable react/prop-types */
import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const Drawer = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState("right");
  return (
    <>
      {children && <span onClick={onOpen}>{children}</span>}

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Drawer;
