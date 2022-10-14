import { Box } from '@chakra-ui/react';
import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Auth from '../components/Auth';
import Chat from '../components/Chat';

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log('test data', session)

  const refreshSession = () => {
    const event = new Event('visibleUsername')
    document.dispatchEvent(event) 
  }

  return (
    <Box>
      { session && session?.user?.username ? (
        <Chat session={session}/>
      ) : (
        <Auth session={session} refreshSession={refreshSession} />
      )}
    </Box>
  )
}

export default Home

export async function getServerSideProps(context: NextPageContext)
{
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
}