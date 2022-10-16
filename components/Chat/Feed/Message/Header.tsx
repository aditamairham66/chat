import { useQuery } from '@apollo/client'
import { Button, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import conversationOperation from "../../../../graphql/operations/conversation";
import { ConversationData } from '../../../../utils/conversationType';
import { formatUsernames } from '../../../../utils/function';

interface Props {
    userId: string
    conversationId: string
}
const HeaderMessage: React.FC<Props> = ({
    userId,
    conversationId,
}) => {
  const route = useRouter()
  const { data, loading } = useQuery<
    ConversationData, 
    null
  >(conversationOperation.Query.conversation)

  const conversation = data?.conversations.find(
    (conversation) => conversation.id === conversationId
  )

  if (data?.conversations && !loading && !conversation) {
    route.replace(process.env.NEXT_PUBLIC_BASE_URL as string)
  }

  return (
    <Stack
        direction="row"
        align="center"
        spacing={6}
        py={5}
        px={{ base: 4, md: 0 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
    >
        <Button
            display={{ md: "none" }}
            onClick={() => 
                route.replace("?conversationId", "/", {
                    shallow: true,
                })
            }
        >
            Back
        </Button>

        {/* {loading && <SkeletonLoader count={1} height="30px" width="320px" />} */}
        {!conversation && !loading && <Text>Conversation Not Found</Text>}
        {conversation && (
            <Stack direction="row">
                <Text color="whiteAlpha.600">To: </Text>
                <Text fontWeight={600}>
                    {formatUsernames(conversation.conversationParticipant, userId)}
                </Text>
            </Stack>
        )}
    </Stack>
  )
}

export default HeaderMessage