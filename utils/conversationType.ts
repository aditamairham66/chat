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
    id: string
    conversationParticipant: Participant[]
    lastMessage: Message
    updatedAt: Date
    createdAt: Date
}

interface Participant {
    user: User
    isRead: Boolean
}

interface User {
    id: string
    username: string
}

interface Message {
    id: string
    body: string
    sender: User
}

export type {
    CreateConversationData,
    CreateConversationVariables,
    ConversationData,
    Conversation,
    Participant,
}