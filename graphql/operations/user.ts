import { gql } from "@apollo/client";

export default {
    Query: {
        searchUser: gql`
            query SearchUsername($username: String!) {
                searchUsername(username: $username) {
                    id
                    username
                }
            }
        `
    },
    Mutation: {
        createUsername: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }
        `
    },
    Subscriptions: {},
}