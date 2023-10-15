import {
  FormControl,
  FormLabel,
  Box,
  VStack,
  Input,
  Button,
  Heading,
  HStack
} from '@chakra-ui/react'
import { useState } from 'react';
import { User, setUser } from '../../reducers/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //TODO: require integration with backend API
  const onSubmit = (e: any) => {
    e.preventDefault();
    const user: User = {
      id: '12345',
      username: username,
      role: 'User'
    }

    dispatch(setUser(user));
  }

  return (
    <Box maxW="md" mx="auto" mt="50px" p={8} rounded="lg" borderWidth={1} shadow="lg">
      <Heading textAlign='center'> Sign up </Heading>
      <form onSubmit={onSubmit}>
        <VStack>
          <FormControl id='username' isRequired>
            <FormLabel>Username</FormLabel>
            <Input type='text'
              name="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </FormControl>

          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input type='text'
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </FormControl>

          <HStack>

            <Button colorScheme="blue" type="submit">
              Register
            </Button>

            <Button colorScheme="gray" onClick={(e) => { navigate('/login') }}>
              Already an user? Log in
            </Button>
          </HStack>

        </VStack>
      </form>
    </Box >
  )
}