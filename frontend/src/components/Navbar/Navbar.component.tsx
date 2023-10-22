import React from "react";
import { Flex, Button, HStack, chakra, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { isLoggedin } from "../../helper/UIHelper";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../reducers/authSlice";
import LogoutButton from "../auth/LogoutButton";
import { LoginModal } from "../auth/LoginModal.component";

export const Navbar = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <chakra.header boxShadow={"md"} minH="10vh" zIndex="999">
      <Flex w="100%" px="6" py="2vh" align={"center"} justify={"space-between"}>
        <HStack spacing="4px">
          <Link to="/">
            <Button colorScheme="linkedin" variant="outline">
              Peer Prep
            </Button>
          </Link>

          <Link to="/">
            <Button colorScheme="blue" variant="ghost">
              Home
            </Button>
          </Link>

          <Link to="/bank">
            <Button variant="ghost">Bank</Button>
          </Link>

          <Link to="/create">
            <Button variant="ghost">Create</Button>
          </Link>

          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
        </HStack>

        <HStack>
          {isAuthenticated ? (
            <>
              <LogoutButton />
              <Button colorScheme="blue">View Account</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" onClick={onOpen}>Log in</Button>
              </Link>
              <LoginModal isOpen={isOpen} onClose={onClose} children={undefined} />
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </chakra.header>
  );
};
