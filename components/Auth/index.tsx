import { useMutation } from '@apollo/client'
import { Button, Center, Image, Input, InputElementProps, Stack, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import userOperation from "../../graphql/operations/user";
import React, { useState } from 'react'
import { CreateUsernameData, CreateUsernameVariables } from '../../utils/userType';

interface Props {
    session: Session | null
    refreshSession: () => void
}
const Auth:React.FC<Props> = ({
    session,
    refreshSession,
}) => {
  const [username, setUsername] = useState<string>("")
  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperation.Mutation.createUsername)

  console.log('mutation', data, loading, error)

  const submitUsername = async () => {
    if (!username) return

    try {
        await createUsername({
            variables: {
                username: username
            }
        })
    } catch (error: any) {
        console.log(error.message)
    }
  }

  return (
    <Center height='100vh'>
        <Stack spacing={8} align='center'>
            {session ? (
                <>
                    <Text fontSize='3xl'>Create a username</Text>
                    <Input 
                        placeholder='Enter a username' 
                        value={username} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                    <Button width='100%' onClick={submitUsername}>Save</Button>
                </>
            ) : (
                <>
                    <Text fontSize='3xl'>MessgerQl</Text>
                    <Button 
                        onClick={() => signIn("google")} 
                        leftIcon={
                            <Image height='20px' src="/img/googlelogo.png"/>
                        }
                    >
                        Continue with Google
                    </Button>
                </>
            )}
        </Stack>
    </Center>
  )
}

export default Auth