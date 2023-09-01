import productsModel from '../dao/models/products.model.js';
import {findProducts,findCarts} from '../dao/mongo/views.mongo.js';
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





export {
    index,
    home,
    chat,
    realTimeProducts,
    carts,
    products,
    getLogs
}