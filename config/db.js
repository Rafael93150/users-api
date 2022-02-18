import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './config/.env'})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Connection error : '+err));

export default mongoose;