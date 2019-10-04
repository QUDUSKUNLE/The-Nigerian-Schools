import mongoose from 'mongoose';
import { GraphQLServer } from 'graphql-yoga';
import { readFileSync } from 'fs'

import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import envs from '../loadenv';

const typeDefs = readFileSync(__dirname + '/schema/schema.graphql', 'utf8');
const resolvers = { Mutation, Query };

mongoose.set('useCreateIndex', true);
mongoose.connect(envs.DB_CONFIG, { useNewUrlParser: true });

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => ({ ...request }),
});
server.start(() => console.log(`Server is running on http://127.0.0.1:${envs.PORT}`));
