import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import conversationRoutes from './routes/conversation.routes.js'
import messageRoutes from './routes/message.routes.js'
import {checkUser, requireAuth} from './middleware/auth.middleware.js';
import cors from 'cors';
import mongoose from './config/db.js'; // database connection

const app = express();

dotenv.config({path: './config/.env'})  // environment variables path

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));  // give access to the API

// jwt & cookies
app.use(cookieParser());
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/users', userRoutes); // users requests
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)

// server port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));