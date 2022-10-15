interface CreateConversationData {
    createConversation: {
        conversationId: string
    }
}

interface CreateConversationVariables {
    usersList: string[]
}

interface ConversationData {
    conversations: Conversation[]
}

interface Conversation {
    conversationParticipant: User
    lastMessage: User
}

interface User {
    id: string
    username: string
}

export type {
    CreateConversationData,
    CreateConversationVariables,
    ConversationData,
}