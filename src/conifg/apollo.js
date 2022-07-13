import {
    ApolloClient,
    InMemoryCache,
    // HttpLink,
    // ApolloLink,
  } from "@apollo/client"

  export const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache(),
  });