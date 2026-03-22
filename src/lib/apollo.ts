"use client";

import { ApolloLink } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
const httpLink = new HttpLink({
  uri: "http://localhost:8080/query",
});

const athLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

export const client = new ApolloClient({
    link: athLink.concat(httpLink),
    cache: new InMemoryCache(),
});