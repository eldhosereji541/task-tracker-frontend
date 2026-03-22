"use client";

import { client } from "@/src/lib/apollo";
import { ApolloProvider } from "@apollo/client/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}