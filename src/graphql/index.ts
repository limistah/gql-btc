import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { Express } from "express";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default (app: Express) => {
  console.log("Applied GraphQL Middleware");
  apolloServer.applyMiddleware({ app, path: "/graphql" });
};
