import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import conversationRoutes from './routes/conversation.routes.js'
import messageRoutes from './routes/message.routes.js'
import {checkUser, requireAuth} from './middleware/auth.middleware.js';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from './config/db.js'; // database connection
import router from './routes/user.routes.js';

const app = express();

const httpServer = createServer();
const io = new Server(httpServer, {
  // ...
});


dotenv.config({path: './config/.env'})  // environment variables path

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));  // give access to the API

// jwt & cookies
app.use(cookieParser());
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/users', userRoutes); // users requests
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

// messages
io.on('connection', (socket) => {
  // socket.on('sendMessage', (message, callback) => {
  //   const user = getUser(socket.id);

  //   io.to(user.room).emit('message', { user: user.name, text: message});

  //   callback();
  // });
  console.log('connection');
})

// server port
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));