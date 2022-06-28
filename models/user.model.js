import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    picture: {
        type: String,
        default: "/uploads/profil/random-user.png"
    },
    bio: {
        type: String,
        maxlength: 100,
        default: "Bonjour à tous !"
    },
    contacts: {
        type: [String]
    },
    requests_sent: {
        type: [String]
    },
    requests_received: {
        type: [String]
    }
}, { timestamps: true, versionKey: false });

userSchema.pre("save", async function(next) {   // encrypted password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {  // check database login
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
  };

const UserModel = mongoose.model('User', userSchema);

export default UserModel;