import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import conversationRoutes from './routes/conversation.routes.js'
import messageRoutes from './routes/message.routes.js'
import {checkUser, requireAuth} from './middleware/auth.middleware.js';
import cors from 'cors';

import express from 'express';

import { createServer } from "http";
import { Server } from "socket.io";

import mongoose from './config/db.js'; // database connection
// import router from './routes/user.routes.js';


//  app
const app = express();

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

// server port
const PORT = process.env.PORT;

app.set('port', PORT);



// socket
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' }, autoConnect:'false'  });

let users = []

const addUser = (userId, socketId) => {
    !users.some(user=>user.userId === userId) &&
      users.push({ userId, socketId});
}

// messages
io.on('connection', (socket) => {
  console.log('connection');

  // take user id and socket id from user

  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    console.log(users);
  })

  socket.on("msgSent", (message) => {
    console.log('message reçu :', message);
  })
})




httpServer.listen(app.get('port'), () => console.log(`Server running on port: http://localhost:${PORT}`));