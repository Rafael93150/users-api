import ConversationModel from '../models/conversation.model.js';

export const getUserConversations = (req, res) => {     // get all conversations
    const { id } = req.params;
    ConversationModel.find({ members: id })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}

export const createConversation = (req, res) => {    // create a conversation
    const members = req.body;
    var query = ConversationModel.find({ members: members }).lean().limit(1) // check if conversation already exists
    query.exec(function(error, result) {
        if (error) throw error;
        if(result.length == 0){
            const conv = new ConversationModel({
                members : members
            });
            conv.save()
            .then(res.send(`This conv has been created`))
            .catch((err) => console.log(err));
        }
    })
    
}