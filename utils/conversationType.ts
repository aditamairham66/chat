interface CreateConversationData {
    createConversation: {
        conversationId: string
    }
}

interface CreateConversationVariables {
    usersList: string[]
}

export type {
    CreateConversationData,
    CreateConversationVariables,
}