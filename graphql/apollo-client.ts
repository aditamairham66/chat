import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';

const http = new HttpLink({
    uri: `http://localhost:4000/graphql`,
    credentials: 'include',
})

export const client = new ApolloClient({
    link: http,
    cache: new InMemoryCache(),
})