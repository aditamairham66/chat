import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
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
    error: errorChat ,
    subscribeToMore
  } = useQuery<ConversationData, null>(conversationOperation.Query.conversation)
  const route = useRouter()
  const {
    conversationId
  } = route.query

  const clickChat = async (chatID: string) => {

    route.push({
      query: {
        conversationId: chatID
      }
    })
  }

  const subscribeNewChat = () => {
    subscribeToMore({
      document: conversationOperation.Subscriptions.conversationCreate,
      updateQuery: (
        prev, 
        { subscriptionData }: { 
          subscriptionData: {
            data: {
              conversationCreated: Conversation
            }
          }
        }
      ) => {
        if (!subscriptionData.data) return prev

        const newChat = subscriptionData.data.conversationCreated
        return Object.assign({}, prev, {
          conversations: [
            newChat as Conversation,
            ...prev.conversations,
          ]
        })
      }
    })
  }

  useEffect(() => {
    subscribeNewChat()
  }, [])

  return (
    <Box 
        display={{
          base: conversationId ? "none" : "flex",
          md: "flex"
        }}
        width={{
            base: '100%',
            md: '400px',
        }}
        bg='whiteAlpha.50'
        py={6}
        px={3}
    >
        <ConversationList 
          session={session} 
          conversations={dataChat?.conversations as Conversation[] || []}
          clickChat={clickChat}
        />
    </Box>
  )
}

export default ConversationWrapper