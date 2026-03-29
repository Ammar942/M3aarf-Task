import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();

// Use an absolute path to find db.json in the project root
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Rewriting /api/* to /* so that /api/tasks becomes /tasks
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

export default server;
