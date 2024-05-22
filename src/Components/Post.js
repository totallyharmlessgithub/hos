import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,

  ChakraProvider,
} from "@chakra-ui/react";
const Post = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div onClick={onOpen} className="justify-center align-middle">
      <img
        src={props.content}
        alt="post"
      />
      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="white" p={4} borderRadius="sm" maxW="1000px">
            
            <Box className="flex flex-row">
              <img
                src={props.content}
                width={500}
                height={500}
                alt="post"
              />
                <p className="text-xl p-2">
                  {props.desc}
                </p>
              
            </Box>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
};

export default Post;
