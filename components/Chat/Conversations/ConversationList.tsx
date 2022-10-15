import { Box, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import React, { useState } from 'react'
import { Conversation, ConversationData } from '../../../utils/conversationType'
import ConversationItem from './ConversationItem'
import ConversationModal from './Modal/Modal'

interface Props {
    session: Session
    conversations: Conversation[]
}
const ConversationList:React.FC<Props> = ({
    session,
    conversations,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
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
                chat={row} 
            />
        ))}
    </Box>
  )
}

export default ConversationList