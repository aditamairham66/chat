import { Box } from '@chakra-ui/react'
import { Session } from 'next-auth'
import React from 'react'
import ConversationList from './ConversationList'

interface Props {
    session: Session
}
const ConversationWrapper:React.FC<Props> = ({
    session
}) => {
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
        <ConversationList session={session}/>
    </Box>
  )
}

export default ConversationWrapper