import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import app from './app';
import { typeDefs } from './schema/graphql';
import { resolvers } from './controllers/graphql';

export const graphqlServerStart = async () => {
    const server = new ApolloServer({
        typeDefs: `#graphql

type User {
    id: Int
}

         type Query {
            me: User
         }
        `,
        resolvers: {
            Query: {
                me: () => {
                    return {
                        id: 1,
                    };
                },
            },
        },
    });
    await server.start();
    app.use('/graphql', expressMiddleware(server));
};
