import UserModel from '../models/user.model.js';

export const getAllUsers = (req, res) => {     // get all users
    UserModel.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}

export const createUser = (req, res) => {    // create an user
    const { pseudo, email, password } = req.body;
    const user = new UserModel({
        pseudo: pseudo,
        email: email,
        password: password
    });
    user.save()
    .then(res.send(`User ${pseudo} has been added`))
    .catch((err) => console.log(err));
}

export const findUser = (req, res) => {     // find an user
    const { id } = req.params;

    UserModel.findById(id).exec()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}

export const deleteUser = (req, res) => {   // delete an user
    const { id } = req.params;
    
    UserModel.findByIdAndDelete(id).exec()
    .then(() => res.send(`User ${id} has been deleted`))
    .catch((err) => console.log(err));
}

export const updateUser = (req, res) => {   // update an user
    const { id } = req.params;
    const { bio } = req.body;

    UserModel.findByIdAndUpdate(id, { bio: bio })
    .then(() => res.send(`User ${id} has been updated`))
    .catch((err) => console.log(err));
}

export const addContact = async (req, res) => {   // add a contact
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {"requests_sent": req.body.hisId} },
            { new: true, upsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err })
        )
        await UserModel.findByIdAndUpdate(
            req.body.hisId,
            { $addToSet: {"requests_received": req.params.id} },
            { new: true, upsert: true })
            .then((data) => {})
            .catch((err) => res.status(500).send({ message: err })
        )
    } catch (err) {
        return res.status(500).json({ message: err });
      }
}

export const deleteContact = async (req, res) => {   // delete a contact
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {contacts: req.body.hisId} },
            { new: true, upsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err })
        )
        await UserModel.findByIdAndUpdate(
            req.body.hisId,
            { $pull: {contacts: req.params.id} },
            { new: true, upsert: true })
            .then((data) => {})
            .catch((err) => res.status(500).send({ message: err })
        )
    } catch (err) {
        return res.status(500).json({ message: err });
      }
}

export const acceptRequest = async (req, res) => {   // accept contact request
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {"requests_received": req.body.hisId},
              $addToSet: {"contacts": req.body.hisId} },
            { new: true, upsert: true })
            .then((data) => {})
            .catch((err) => res.status(500).send({ message: err })
        )
        await UserModel.findByIdAndUpdate(
            req.body.hisId,
            { $addToSet: {"contacts": req.params.id},
              $pull: {"requests_sent": req.params.id} },
            { new: true, upsert: true })
            .then((data) => {res.send(data)})
            .catch((err) => res.status(500).send({ message: err })
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export const rejectRequest = async (req, res) => {   // reject contact request
    try{
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {"requests_received": req.body.hisId} },
            { new: true, upsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err })
        )
        await UserModel.findByIdAndUpdate(
            req.body.hisId,
            { $pull: {"requests_sent": req.params.id} },
            { new: true, upsert: true })
            .then((data) => {})
            .catch((err) => res.status(500).send({ message: err })
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export const cancelRequest = async (req, res) => {   // cancel contact request
    try{
        await UserModel.findByIdAndUpdate(
            req.body.hisId,
            { $pull: {"requests_received": req.params.id} },
            { new: true, upsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err })
        )
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: {"requests_sent": req.body.hisId} },
            { new: true, upsert: true })
            .then((data) => {})
            .catch((err) => res.status(500).send({ message: err })
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}