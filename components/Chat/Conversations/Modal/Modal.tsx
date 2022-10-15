import { useLazyQuery, useMutation } from '@apollo/client'
import { Button, Input, Modal as ModalChakra, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import userOperation from "../../../../graphql/operations/user";
import conversationOperation from "../../../../graphql/operations/conversation";
import { SearchUser, SearchUsernameData, SearchUsernameVariables } from '../../../../utils/userType';
import ListUsers from './ListUsers';
import SelectUsers from './SelectUsers';
import { CreateConversationData, CreateConversationVariables } from '../../../../utils/conversationType';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

interface Props {
    isOpen: boolean
    modalClose: () => void
    session: Session
}
const Modal:React.FC<Props> = ({
    isOpen,
    modalClose,
    session,
}) => {
  const {
    user: {
        id: usersID
    }
  } = session

  const [username, setUsername] = useState("")
  const [selectUsers, setSelectUsers] = useState<SearchUser[]>([])
  const [searchUsername, { data, loading, error }] = useLazyQuery<
    SearchUsernameData,
    SearchUsernameVariables
  >(userOperation.Query.searchUser)
  const [createChat, { loading: chatLoading }] = useMutation<
    CreateConversationData, 
    CreateConversationVariables
  >(conversationOperation.Mutation.createChat)
  const route = useRouter()

  const searchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    searchUsername({
        variables: {
            username: username
        }
    })
  }

  const addUsers = (user: SearchUser) => {
    setSelectUsers((prev) => [
        ...prev,
        user
    ])
  }

  const deleteUser = (userID : string) => {
    setSelectUsers((prev) => prev.filter((row) => row.id !== userID))
  }

  const createConversation = async () => {
    const id = [usersID, ...selectUsers.map((row) => row.id)]
    try {
        const { data } = await createChat({
            variables: {
                usersList: id
            }
        })

        if (!data?.createConversation) {
          throw new Error("Create Conversation is failed")
        }

        const {
          createConversation: { conversationId }
        } = data

        route.push({
          query: {conversationId}
        })

        setUsername("")
        setSelectUsers([])
        modalClose()
    } catch (error: any) {
        toast.error(error.message)
    }
  }

  return (
    <>
      <ModalChakra isOpen={isOpen} onClose={modalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form onSubmit={searchSubmit}>
                <Stack>
                    <Input
                        placeholder='Enter a username'
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                    <Button type='submit' disabled={!username} isLoading={loading}>
                        Search
                    </Button>
                </Stack>
            </form>

            {data && data.searchUsername && (
                <ListUsers users={data?.searchUsername} addUsers={addUsers}/>
            )}

            {selectUsers.length > 0 && (
                <>
                    <SelectUsers users={selectUsers} deleteUsers={deleteUser}/>
                    <Button
                        bg='brand.100'
                        width='100%'
                        mt={6}
                        _hover={{ bg: 'brand.100' }}
                        onClick={createConversation}
                        isLoading={chatLoading}
                    >Create Conversation</Button>
                </>
            )}
          </ModalBody>

        </ModalContent>
      </ModalChakra>
    </>
  )
}

export default Modal