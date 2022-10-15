import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { Session } from 'next-auth'
import React from 'react'
import conversationOperation from "../../../graphql/operations/conversation";
import { Conversation, ConversationData } from '../../../utils/conversationType'
import ConversationList from './ConversationList'

interface Props {
    session: Session
}
const ConversationWrapper:React.FC<Props> = ({
    session
}) => {
  const { 
    data: dataChat, 
    loading: loadingChat, 
    error: errorChat 
  } = useQuery<ConversationData, null>(conversationOperation.Query.conversation)
  
  console.log(dataChat)

  return (
    <Box 
        width={{
            base: '100%',
            md: '400px',
        }}
        bg='whiteAlpha.50'
        py={6}
        px={3}
    >
        <ConversationList session={session} conversations={dataChat?.conversations as Conversation[] || []}/>
    </Box>
  )
}

export default ConversationWrapper