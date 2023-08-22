import { createHash } from '../../utils.js';
import userModel from '../models/users.model.js';
import MongooseSingleton from '../../config/db.connection.js';

class usersDaoMongo {
    constructor() {
        const db = MongooseSingleton.getInstance();
    }

    recover = async function (email,password){
    try{
        const user = await userModel.findOne({ email });
        if (!user) {
            throw Error("Correo electrónico incorrecto.");
        }else{
        const passHash = createHash(password);
        user.password = passHash;
        return await user.save();
        }
    } catch{
        throw Error("Error del servidor");
    }
}
}
export default usersDaoMongo