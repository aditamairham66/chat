import { Flex } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import React from 'react'
import HeaderMessage from './Message/Header'

interface Props {
    session: Session
}
const FeedWrapper:React.FC<Props> = ({
  session
}) => {
  const route = useRouter()
  const { conversationId } = route.query
  const {
    user: {
      id: usersId
    }
  } = session
  
  return (
    <Flex
      display={{
        base: conversationId ? "flex" : "none",
        md: "flex"
      }}
      width='100%'
      direction='column'
    >
      {conversationId ? (
        <Flex
          direction='column'
          justify='space-between'
          overflow='hidden'
          flexGrow={1}
        >
          <HeaderMessage 
            userId={usersId} 
            conversationId={conversationId as string} 
          />
        </Flex>
      ) : (
        <div>No Conversation Selected</div>
      )}
    </Flex>
  )
}

export default FeedWrapper