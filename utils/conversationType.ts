interface CreateConversationData {
    createConversation: {
        conversationId: string
    }
}

interface CreateConversationVariables {
    usersList: string[]
}

interface ConversationData {
    conversations?: Conversation[]
}

interface Conversation {
    id: string
    conversationParticipant: Participant[]
    lastMessage: User[]
}

interface Participant {
    user: User[]
    isRead: Boolean
}

interface User {
    id: string
    username: string
}

export type {
    CreateConversationData,
    CreateConversationVariables,
    ConversationData,
    Conversation,
}