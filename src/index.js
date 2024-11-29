import { ApolloServer } from '@apollo/server';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from './lib/db.js'


async function init() {
    const app = express();

    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            say(name:String):String
        }
        type Mutation{
        createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
        }
        `,
        resolvers: {
            Query: {
                hello: () => `hey there`,
                say: ("", name => `hey ${name}`)
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }) => {
                    await prismaClient.user.create({ data: { email, firstName, lastName, password, salt: "hello" } });
                    return true;
                }
            }
        },
    });

    await server.start();

    app.use('/graphql', expressMiddleware(server));

    const PORT = 8000;

    app.listen(PORT, () => {
        console.log(`Server started on: ${PORT}`);
    });
}

init();


