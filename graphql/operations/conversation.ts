import { gql } from "@apollo/client";

export default {
    Query: {
        conversation: gql`
            query Conversation {
                conversations {
                    id
                    conversationParticipant {
                        user {
                            id
                            username
                        }
                        isRead
                    }
                    lastMessage {
                        id
                        sender {
                            id
                            username
                        }
                        body
                        createdAt
                    }
                    updatedAt
                }
            }
        `
    },
    Mutation: {
        createChat: gql`
            mutation CreateChat($usersList: [String]!) {
                createConversation(usersList: $usersList) {
                    conversationId
                }
            }
        `
    },
    Subscriptions: {},
}