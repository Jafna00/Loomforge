import 'dotenv/config';
import http from 'http';

import app from './app.js';
import { connectDB } from './config/db.js';
import { initSocket } from './socket/socketServer.js';

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);
initSocket(httpServer);

connectDB().then(() => {
    httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});