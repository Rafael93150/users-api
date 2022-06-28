import UserModel from '../models/user.model.js';
import fs from 'fs';
import { promisify } from 'util';
import stream from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pipeline = promisify(stream.pipeline);

export const uploadProfil = async (req, res) => {

    let error = 'no error';

    try{
        if (
            req.file.detectedMimeType !== "image/jpg" && 
            req.file.detectedMimeType !== "image/jpeg" && 
            req.file.detectedMimeType !== "image/png"
        ){
            throw Error("invalid file");
        }
            
        
        if (req.file.size > 500000) 
            throw Error("max size");

    } catch(err) {
        if (err.message.includes('invalid file'))
            error = "Format incompatabile";

        if (err.message.includes('max size'))
            error = "Le fichier dépasse 500ko";

        return res.status(201).json({ error });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../client/public/uploads/profil/${fileName}`)
    );

    try{
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: {picture: "/uploads/profil/" + fileName}},
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if(!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        // return res.status(500).send({ message: err });
    }
}