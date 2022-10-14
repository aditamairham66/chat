import { gql } from "@apollo/client";

export default {
    Query: {},
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