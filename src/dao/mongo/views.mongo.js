import productsModel from "../models/products.model.js";
import cartsModel from "../models/carts.model.js";
import userModel from "../models/users.model.js";

const findProducts = async function (){
    try{
        let products = await productsModel.find().lean();
        if (!products) {
            throw Error("No se han encontrado productos.");
        }else{
            return products;
        }
    } catch{
        throw Error("Error al buscar los productos.");
    }
}

const findCarts = async function (){
    try{
        let carts = await cartsModel.find().populate('products.product').lean();
        if (!carts) {
            throw Error("No se han encontrado productos.");
        }else{
            return carts;
        }
    } catch{
        throw Error("Error al buscar los carritos.");
    }
}

const getUserByEmail = async function (email){
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

const updatePasswordByEmail = async function (email, hashedPassword){
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
// const sendLink = async function (){
//     try{
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'prueba18494@gmail.com',
//                 pass: 'pwpyyoqmgywijoad'
//             }
//         });

//         const html = '<h1>http://localhost:8080/recovery</h1>';
//         const mailOptions = {
//             from: 'cosmefulanito@outlook.com',
//             to: 'prueba18494@gmail.com',
//             subject: 'Test desde nodemailer',
//             html: html,
//             // attachmnents: [{
//             //     patch: __dirname+'./perro.jpeg',
//             //     cid: "this is fine"
//             // }]
//         };
        
//         console.log(mailOptions);
        
//         transporter.sendMail(mailOptions, (err, info) => {
//             if(err) {
//                 console.log("Error: ", err);
//                 return;
//             }
        
//             console.log(`Mensaje enviado con exito: trackId: ${info}`);
//         });
//     } catch{
//         throw Error("Error al enviar mail.");
//     }
// }

export{
    findProducts,
    findCarts,
    getUserByEmail,
    updatePasswordByEmail
}