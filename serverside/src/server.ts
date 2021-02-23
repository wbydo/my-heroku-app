import { createServer } from 'restify';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import corsMiddleware from 'restify-cors-middleware';
import fs from 'fs';
import path from 'path';
import { createConnection } from 'typeorm';

import ormConfig from './db/ormconfig';
import { resolvers } from './resolvers';

const typeDefs = fs
  .readFileSync(
    path.resolve(path.join(__dirname, '../../graphql/schema.graphql'))
  )
  .toString();

// 参考: https://github.com/graphql/express-graphql/issues/473
const schema = makeExecutableSchema({
  typeDefs,
  // 参考: https://github.com/dotansimha/graphql-code-generator/issues/1133
  resolvers: resolvers as IResolvers,
});

const server = createServer();

// TODO: リモートにデプロイする場合は検討
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry'],
});

server.pre(cors.preflight);
server.use(cors.actual);

// const port: number = config.get<number>('serverside.port');

(async () => {
  const dbConnection = await createConnection(ormConfig);

  server.get(
    '/graphql',
    graphqlHTTP({
      schema,
      context: { dbConnection },
      graphiql: true,
    })
  );
  server.post(
    '/graphql',
    graphqlHTTP({
      schema,
      context: { dbConnection },
      graphiql: false,
    })
  );

  server.head('/graphql', (req, res, next) => {
    res.send('close');
    next();
  });

  server.listen(port, () => {
    console.log(`listen port=${port.toString()}`);
  });
})();
