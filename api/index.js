import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();

// Read the db.json file content ONCE during startup
const dbFilePath = path.join(__dirname, '..', 'db.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

// This tells json-server to keep everything in memory!
const router = jsonServer.router(dbContent);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({ '/api/*': '/$1' }));
server.use(router);

export default server;
