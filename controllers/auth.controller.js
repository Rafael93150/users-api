import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
// import { signUpErrors, signInErrors }

const maxAge = 3 * 24 * 60 * 60 * 1000;
// const maxAge = 20000;
var error = "";

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

export const signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(201).json({ user: user._id})
  }
  catch(err) {
    // const errors = signUpErrors(err);
    // res.status(200).send({ errors })
    if (err.message.includes("pseudo"))
      error = "Le pseudo doit contenir 5 caractères minimum";
    else if (err.message.includes("email"))
      error = "Cette adresse email est invalide";
    else if (err.message.includes('password'))
      error = "Le mot de passe doit contenir 6 caractères minimum";
    else error = "Unknown error";
    res.status(200).json({ error });
  }
}

export const signIn = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    if (err.message.includes("email"))
      error = "Cette adresse email n'existe pas";
    else if (err.message.includes('password'))
      error = "Le mot de passe est incorrect";
    else error = "Unknown error";
    res.status(200).json({ error });
  }
}

export const logOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}