import { Avatar, Box, Button, Card, CardFooter, CardHeader, Flex, FormControl, FormLabel, HStack, Heading, Input, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { User, setUser } from "../../../reducers/authSlice";
import { updateUserProfile } from "../../../api/auth";
import { useDispatch } from "react-redux";

export type ProfileCardProp = {
  displayedUser: User
  isViewingOtherUser: boolean
};


export default function ProfileCard(props: ProfileCardProp) {

  const { displayedUser, isViewingOtherUser } = props;
  const [isEditingProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState(displayedUser!.username);
  const [bio, setBio] = useState(displayedUser!.bio);
  const dispatch = useDispatch();
  const toast = useToast();

  const onSave = async () => {

    try {
      if (username === displayedUser!.username && bio === displayedUser!.bio) {

      } else {
        const res = await updateUserProfile(username, bio);
        const updatedUser = res.data;
        dispatch(setUser(updatedUser));
      }
    } catch (error) {
      toast({
        title: 'Unable to update profile',
        description: 'Username is already taken!',
        status: 'error'
      })
      setUsername(displayedUser!.username);
      setBio(displayedUser!.bio);
    }
    setEditProfile(false);
  }


  return (
    <Card variant={"elevated"}>
      <CardHeader>
        <Flex w="100%" justifyContent={"space-between"}>
          <VStack alignItems={"flex-start"} rowGap={0} maxW={"70%"}>
            <Heading size='md'> {`${isViewingOtherUser ? '' : "Hello"} ${displayedUser!.username}`}</Heading>
            <Text color={'grey'}>{displayedUser!.role} </Text>
            <Text maxWidth={"100%"} noOfLines={3}>{displayedUser!.bio} </Text>
          </VStack>

          <Avatar size="xl" name={displayedUser.username}></Avatar>
        </Flex>
      </CardHeader>

      {
        isViewingOtherUser 
          ? <></>
          :
          <CardFooter pt={0}>
            {
              !isEditingProfile ?
                <Button w="100%" onClick={() => setEditProfile(true)}>
                  Edit Profile
                </Button> :

                <VStack w="100%">
                  <FormControl id='username'>
                    <FormLabel>Username</FormLabel>
                    <Input type='text'
                      name="username"
                      value={username}
                      onChange={(e) => { setUsername(e.target.value) }}
                    />
                  </FormControl>

                  <FormControl id='bio'>
                    <Flex justifyContent={"space-between"}>
                      <FormLabel>Bio</FormLabel>
                      <Text margin={0}> {128 - (bio?.length === undefined ? 0 : bio?.length!)}/128 </Text>
                    </Flex>
                    <Textarea
                      name="bio"
                      isInvalid={bio !== null && bio!.length == 128}
                      value={bio === null ? '' : bio}
                      onChange={(e) => { 
                        let inputValue = e.target.value
                        if (inputValue.length <= 128){
                          setBio(e.target.value) 
                        }
                      }}
                    />
                  </FormControl>
                  <Flex alignItems={"flex-start"} w="100%" columnGap={"8px"}>
                    <Button colorScheme="green" onClick={onSave}>
                      Save
                    </Button>
                    <Button onClick={() => setEditProfile(false)}>
                      Cancel
                    </Button>
                  </Flex>
                </VStack>

            }

          </CardFooter>
      }
    </Card>

  )


}