import MessageModel from '../models/message.model.js';

export const getConvMessages = (req, res) => {     // get all messages
    const { convId } = req.params;
    MessageModel.find({ convId: convId })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}

export const newMessage = (req, res) => {    // create a new message
    const senderId = req.body.senderId;
    const convId = req.body.convId;
    const message = req.body.message;
    const conv = new MessageModel({
        convId: convId,
        senderId: senderId,
        message: message
    });
    conv.save()
    .then(res.send(`This message has been added`))
    .catch((err) => console.log(err));
}