import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import { Session } from 'next-auth'
import React from 'react'
import ConversationWrapper from './Conversations/ConversationWrapper'
import FeedWrapper from './Feed/FeedWrapper'
import conversationOperation from "../../graphql/operations/conversation";
import { ConversationData } from '../../utils/conversationType'

interface Props {
  session: Session
}
const Chat:React.FC<Props> = ({
  session
}) => {
  return (
    <Flex
      height='100vh'
    >
      <ConversationWrapper session={session}/>
      <FeedWrapper session={session}/>
    </Flex>
  )
}

export default Chat