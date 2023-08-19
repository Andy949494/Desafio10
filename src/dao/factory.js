import config from "../config/config.js";
//import usersDaoRam from "";
import usersDaoMongo from "./mongo/users.mongo.js";
import productsDaoMongo from "./mongo/products.mongo.js";
import cartsDaoMongo from "./mongo/carts.mongo.js";


export let userDB,productDB,cartDB;

switch (config.persistence) {
    case "MONGO": 
        userDB = new usersDaoMongo();
        productDB =  new productsDaoMongo();
        cartDB =  new cartsDaoMongo();
        break;

    case "MEMORY": 
        //userDB = new usersDaoRam();
        break;

    default: console.log("No se configuro una base de datos");
        process.exit(1);
        break;
}