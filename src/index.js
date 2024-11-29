import { ApolloServer } from '@apollo/server';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express();

    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            say(name:String):String
        }
        `,
        resolvers: {
            Query: {
                hello: () => `hey there`,
                say: ("", name => `hey ${name}`)
            },
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


