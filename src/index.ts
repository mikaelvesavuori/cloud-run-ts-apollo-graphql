import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { getUsersUseCase } from './usecases/getUsers';

const PORT = process.env.PORT || 8080;

const typeDefs = gql`
  type Query {
    getUsers: [User]
  }

  type User {
    name: String
    userId: String
    email: String
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => await getUsersUseCase()
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}; ${PORT}`)
);
