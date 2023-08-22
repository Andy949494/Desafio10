import { createHash } from '../../utils.js';
import userModel from '../models/users.model.js';
import MongooseSingleton from '../../config/db.connection.js';

class usersDaoMongo {
    constructor() {
        const db = MongooseSingleton.getInstance();
    }

    getUserByEmail = async function (email){
    try{
        const user = await userModel.findOne({email: email});
        if (!user) {
            throw Error("No se ha encontrado un usuario con ese email.");
        }else{
            return user;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    updatePasswordByEmail = async function (email, hashedPassword){
    try{
        const user = await userModel.updateOne({email: email}, {$set: {password: hashedPassword}});
        if (!user) {
            throw Error("No se ha podido actualizar la contraseña.");
        }else{
            return user;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    updateUser = async function ({uid},newRole){
    try{
        const updatedUser = await userModel.updateOne({_id:uid},{role:newRole});
        if (!updatedUser) {
            throw Error("No se ha encontrado un usuario con esa Id.");
        }else{
            return updatedUser;
        }
    } catch{
        throw Error("Error del servidor");
    }
}
}
export default usersDaoMongo