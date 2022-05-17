import express, { Application } from 'express';
import { graphqlHTTP } from "express-graphql";
import {schema} from './graphql/schemas'

const app: Application = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT)