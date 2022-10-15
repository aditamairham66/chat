import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Conversation } from '../../../utils/conversationType'

interface Props {
    chat: Conversation
}
const ConversationItem:React.FC<Props> = ({
    chat
}) => {
  return (
    <Stack
        p={4}
        _hover={{
            bg: "whiteAlpha.200"
        }}
        borderRadius={4}
        cursor='pointer'
    >
        <Text>{chat.id}</Text>
    </Stack>
  )
}

export default ConversationItem