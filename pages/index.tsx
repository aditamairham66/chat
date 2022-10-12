import type { NextPage, NextPageContext } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const {data} = useSession();
  console.log('test data', data)

  return (
    <>
      <button onClick={() => signIn('google')}>login</button>
      <button onClick={() => signOut()}>logout</button>
    </>
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