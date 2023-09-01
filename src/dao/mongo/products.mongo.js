import productsModel from "../models/products.model.js"
import MongooseSingleton from '../../config/db.connection.js';
import { generateProducts } from "../../mock/mocking.js";

class productsDaoMongo {
    constructor() {
        const db = MongooseSingleton.getInstance();
    }

    findAllProducts = async function (){
    try{
        const products = await productsModel.find();
        if (!products) {
            throw Error("No se han encontrado productos.");
        }else{
            return products;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    findProductById = async function (pid){
    try{
        const product = await productsModel.findById(pid);
        if (!product) {
            throw Error("No se ha encontrado un producto con esa Id.");
        }else{
            return product;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    createProduct = async function ({productData}){
    try{
        let {title,description,code,price,status,stock,category,thumbnails} = productData
        const product = await productsModel.create({title,description,code,price,status,stock,category,thumbnails});
        if (!product) {
            throw Error("Error al agregar el producto.");
        }else{
            return product;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    updateOneProduct = async function ({pid},replace){
    try{
        const updatedProduct = await productsModel.updateOne({_id:pid},replace);
        if (!updatedProduct) {
            throw Error("No se ha encontrado un producto con esa Id.");
        }else{
            return updatedProduct;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    deleteOneProduct = async function ({pid}){
    try{
        const deletedProduct = await productsModel.deleteOne({_id:pid});
        if (!deletedProduct) {
            throw Error("No se ha encontrado un producto con esa Id.");
        }else{
            return deletedProduct;
        }
    } catch{
        throw Error("Error del servidor");
    }
}

    mockProducts = async function (){
        try {
            let products = [];
            for (let i = 0; i < 1; i++) {
                products.push(generateProducts());
            }
            if (!products) {
                return res.sendUserError('Couldnt mock products.')
            } else {
            let productsOnMongo = await productsModel.insertMany(products);
            return productsOnMongo;
            }
        } catch (error) {
            res.sendServerError('Internal server error.')
        }
}
}

export default productsDaoMongo;
