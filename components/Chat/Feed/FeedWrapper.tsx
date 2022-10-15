import { Flex } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
    session: Session
}
const FeedWrapper:React.FC<Props> = () => {
  const route = useRouter()
  const { conversationId } = route.query
  
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
        <Flex>{conversationId}</Flex>
      ) : (
        <div>No Conversation Selected</div>
      )}
    </Flex>
  )
}

export default FeedWrapper