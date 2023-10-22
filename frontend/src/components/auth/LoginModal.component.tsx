import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  useToast,
  FormControl,
  FormLabel,
  Button
} from '@chakra-ui/react'
import LoginForm from './LoginForm'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../api/auth';
import { setUser } from '../../reducers/authSlice';


export function LoginModal(props: ModalProps) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (e: any) => {
    e.preventDefault();

    login(username, password).then(response => {
      const user = response.data.user;
      //TODO: do something w access token?
      const access_token = response.data.token;
      dispatch(setUser(user));
      props.onClose()
      navigate('/');
    }).catch((err) => {
      console.log(err);
      toast({
        title: 'Failed to Login',
        description: 'Incorrect username or password',
        status: 'error',
        isClosable: true,
      });
    })
  }


  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={onSubmit}>

        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl id='username' isRequired mt={4}>
              <FormLabel>Username</FormLabel>
              <Input type='text'
                name="username"
                value={username}
                onChange={(e: any) => { setUsername(e.target.value) }}
              />
            </FormControl>

            <FormControl id='password' isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type='text'
                name="password"
                value={password}
                onChange={(e: any) => { setPassword(e.target.value) }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type="submit">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>)
}