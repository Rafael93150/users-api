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
    .then((result) => res.send(`User ${pseudo} has been deleted`))
    .catch((err) => console.log(err));
}

export const updateUser = (req, res) => {   // update an user
    const { id } = req.params;
    const { pseudo, email } = req.body;

    UserModel.findByIdAndUpdate(id, { pseudo: pseudo, email: email })
    .then((result) => res.send(`User ${pseudo} has been updated`))
    .catch((err) => console.log(err));
}