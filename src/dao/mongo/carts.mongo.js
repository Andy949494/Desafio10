import cartsModel from '../models/carts.model.js'
import MongooseSingleton from '../../config/db.connection.js';

class cartsDaoMongo {
    constructor() {
        const db = MongooseSingleton.getInstance();
    }

    createCart = async function (){
    try{
        let carts = await cartsModel.create({});
        if (!carts) {
            throw Error("Error al agregar nuevo carrito.");
        }else{
            return carts;
        }
    } catch{
        throw Error("Error de servidor.");
    }
}

    findAllCarts = async function (){
    try{
        const carts = await cartsModel.find().populate('products.product');
        if (!carts) {
            throw Error("No se han encontrado productos.");
        }else{
            return carts;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    findCartById = async function (cid){
    try{
        const cart = await cartsModel.findById(cid);
        if (!cart) {
            throw Error("No se ha encontrado un carrito con esa Id.");
        }else{
            return cart;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    updateOneCart = async function ({cid},cart){
    try{
        const updatedCart = await cartsModel.updateOne({_id:cid},cart);
        if (!updatedCart) {
            throw Error("Error al actualizar el carrito.");
        }else{
            return updatedCart;
        }
    } catch{
        throw Error("Error del servidor");
    }
}
}

export default cartsDaoMongo
