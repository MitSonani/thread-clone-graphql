import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGrapgQlServer from './graphql/index.js';



async function init() {
    const app = express();

    app.use(express.json());

    app.use('/graphql', expressMiddleware(await createApolloGrapgQlServer()));

    const PORT = 8000;

    app.listen(PORT, () => {
        console.log(`Server started on: ${PORT}`);
    });
}

init();


