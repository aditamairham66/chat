import { Button, Center, Image, Input, InputElementProps, Stack, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

interface Props {
    session: Session | null
    refreshSession: () => void
}
const Auth:React.FC<Props> = ({
    session,
    refreshSession,
}) => {
  const [username, setUsername] = useState<string>("")

  const submitUsername = async () => {
    try {
        
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