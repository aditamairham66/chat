import { Box, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Conversation } from '../../../utils/conversationType'
import ConversationItem from './ConversationItem'
import ConversationModal from './Modal/Modal'

interface Props {
    session: Session
    conversations: Conversation[]
    clickChat: (option: string) => void
}
const ConversationList:React.FC<Props> = ({
    session,
    conversations,
    clickChat,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const route = useRouter()
  const {
    conversationId
  } = route.query
  const {
    user: {
        id: usersId
    }
  } = session
  
  const modalOpen = () => setIsOpen(true)
  
  const modalClose = () => setIsOpen(false)

  return (
    <Box width='100%'>
        <Box
            py={2}
            px={4}
            mb={4}
            bg='whiteAlpha.300'
            borderRadius={4}
            cursor='pointer'
            onClick={modalOpen}
        >
            <Text
                align='center'
                color='whiteAlpha.800'
                fontWeight={500}
            >
                Find Start a Conversation
            </Text>
        </Box>

        <ConversationModal isOpen={isOpen} modalClose={modalClose} session={session}/>

        {conversations.map((row, i) => (
            <ConversationItem 
                key={i} 
                userId={usersId}
                chat={row} 
                onClick={() => clickChat(row.id)}
                selectChatID={conversationId as string}
            />
        ))}
    </Box>
  )
}

export default ConversationList