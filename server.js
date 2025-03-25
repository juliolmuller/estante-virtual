import jsonServer from 'json-server';

import database from './server.json' with { type: 'json' };

const server = jsonServer.create();
const router = jsonServer.router('server.json');
const middleware = jsonServer.defaults();
const PORT = process.env.PORT || 8081;

server.use(middleware);
server.use(router);

server.listen(PORT, () => {
  console.info(`    JSON-Server is running at port ${PORT}`);
  console.info('');
  console.info('    Available endpoints:');

  Object.keys(database).forEach((endpoint) => {
    console.info(`        http://localhost:${PORT}/${endpoint}`);
  });
});
