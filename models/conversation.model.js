import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members: {
        type: [String]
    },
}, { timestamps: true, versionKey: false });

const ConversationModel = mongoose.model('Conversation', ConversationSchema);

export default ConversationModel;