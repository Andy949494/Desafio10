import productsModel from '../dao/models/products.model.js';
import {findProducts,findCarts,getUserByEmail,updatePasswordByEmail} from '../dao/mongo/views.mongo.js';
import { sendRecoverPassword } from '../utils/mail.utils.js';
import { generarToken, validateToken, createHash } from '../utils/validations.utils.js';
import log from '../config/customLogger.js';
import fs from 'fs/promises';
import __dirname from '../utils.js';
import path from 'path';


const index = (req,res)=>{
    res.render('index')
}

const home = async (req, res) => {
    try {
        let products = await findProducts();
        res.render('home', { products, style: 'index.css'});
    } catch (error) {
        log.error('Internal server error.')
        res.sendServerError()
    }
}

const chat = (req,res)=>{
    res.render('chat')
}

const realTimeProducts = async (req, res) => {
    try {
        res.render('realTimeProducts', {style: 'index.css'});
    } catch (error) {
        log.error('Internal server error.')
        res.sendServerError()
    }
}

const carts = async (req, res) => {
    try {
        let carts = await findCarts();
        res.render('carts', { carts, style: 'index.css'});
    } catch (error) {
        log.error('Internal server error.')
        res.sendServerError()
    }
}

const products = async (req,res)=>{
    try {
    const {firstname, lastname, email, age} = req.user;    
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    let sort = req.query.sort;
    let category = req.query.category;
    let query = {};
    let options = {page, limit, lean:true, sort:{} };
    if (category && category !== 'undefined') {
        query.category = category;
    }
    if (sort === 'asc') {
    options.sort.price = 1;
    } else if (sort === 'desc') {
    options.sort.price = -1;
    }


    let result = await productsModel.paginate(query, options, {style: 'index.css'});

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&limit=${limit}&sort=${sort}&category=${category}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&limit=${limit}&sort=${sort}&category=${category}` : '';
    result.isValid= !(page<=0||page>result.totalPages)
    result.firstname = firstname;
    result.lastname = lastname;
    result.email = email;
    result.age = age;
    res.render('products',result)
    }  
    catch (error) {
        log.error('Internal server error.')
        res.sendServerError()
    }
}

const getLogs = async (req, res) => {
     try {
        const filePath = path.join(__dirname, '../logs/errors.log');
        let logs = await fs.readFile(filePath, 'utf-8');
        if (logs){
            return res.sendSuccess(logs);  
        }
     } catch (error) {
        //log.error('Internal server error.');
        res.sendServerError()
     }
}

const passwordRecover = async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(404).send("email no enviado");
    }

    try {
        const user = await getUserByEmail(email);

        if(!user) {
            return res.status(404).send("Usuario no existente!");
        }

        const token = generarToken(email);
        sendRecoverPassword(email, token);
        res.status(200).send("Reseto de contraseña enviada!");
    } catch (e) {
        console.log("Error: ", e);
        res.status(500).send("Error interno!");
    }
}

const recoverPassword = (req, res) => {
    const { token } = req.query;
    const { email } = req.body;
    try {
        const checkToken = validateToken(token);
        if(!checkToken) {
            console.log("Invalid token");
            return res.status(401).send("Acceso denegado!");
        }

        const newToken = generarToken(email);
        
        // enviarlo dentro de un json y tomarlo en la pagina donde se reseta la contraseña!
        res.status(200).send(`Enviar a la pagina para resetar la contraseña!, token: ${newToken}`);

    } catch (e) {
        console.log("Error: ", e);
        res.status(500).send("Error interno!");
    }

}

const resetPassword = async (req, res) => {
    const { email, password} = req.body;

    try {
        const hashedPassword = createHash(password);
        await updatePasswordByEmail(email, hashedPassword);

        res.status(200).send("Contraseña modificada correctamente");
    } catch (e) {
        console.log("Error: ", e);
        res.status(500).send("Error interno!");
    }
    
}

const changeRole = async (req, res) => {
    try {
        if (req.user.role == 'admin'){
            req.user.role = 'premium'
            return res.status(200).send("Su nuevo rol es Premium");
        } else if (req.user.role == 'premium'){
            req.user.role = 'admin'
            return res.status(200).send("Su nuevo rol es Admin");
        }
    } catch (error) {
       //log.error('Internal server error.');
       res.sendServerError()
    }
}

export {
    index,
    home,
    chat,
    realTimeProducts,
    carts,
    products,
    getLogs,
    passwordRecover,
    recoverPassword,
    resetPassword,
    changeRole
}