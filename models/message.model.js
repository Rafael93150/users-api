import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    convId:{
        type: String
    },
    senderId: {
        type: String
    },
    message: {
        type: String,
        required: true,
        maxlength: 200
    }
}, { timestamps: true, versionKey: false });

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;