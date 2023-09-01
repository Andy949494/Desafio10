import { productDB } from '../dao/factory.js';
import productsDTO from '../dto/products.dto.js';
import log from '../config/customLogger.js';

const getProducts = async (req, res) => {
    try {
        let products = await productDB.findAllProducts();
        let limit = req.query.limit;
        if (limit){
            let LimitedProducts = products.slice(0,limit);
            return res.sendSuccess(LimitedProducts);
        } else {
            return res.sendSuccess(products);  
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const getProductsById = async (req, res) => {
    try {
        let product = await productDB.findProductById(req.params.pid)
        if (!product) {
            return res.sendUserError('Id not found.')
        } else {
        return res.sendSuccess(product);
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const addProduct = async (req, res) => {
    try{
        let {title,description,code,price,status,stock,category,thumbnails} = req.body;
        let productData = new productsDTO({title,description,code,price,status,stock,category,thumbnails})

        if(!title||!description||!code||!price||!status||!stock||!category) {
            return res.sendUserError('Incomplete values');
        }
        if (req.files.length > 0) {
            let fileNames = req.files.map(file => `http://localhost:8080/images/${file.filename}`); //la función flecha transforma cada elemento del arreglo req.files en una URL completa de la imagen y se almacena en el arreglo fileNames.
            productData.thumbnails = fileNames;
        }
        let result = await productDB.createProduct({productData});
        if(!result){
            return res.sendUserError('Error al agregar el producto.')
        }else{
            return res.sendSuccess(result);
        }
    } catch {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const updateProduct = async (req, res) => {
    if (req.user.role = 'admin'){
    
    try {
        let product = await productDB.findProductById(req.params.pid)
        if (!product) {
            return res.sendUserError('Id not found.')
        } else {    
        let productToReplace = req.body;
        let pid = req.params.pid;
        let update = await productDB.updateOneProduct({pid},productToReplace);
        if (!update){
            return res.sendUserError('Error al actualizar el producto.')
        } else{
            return res.sendSuccess('Product updated successfully');

        }
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
    } else if (req.user.role = 'premium') {
        try {
            let product = await productDB.findProductById(req.params.pid)
            if (!product) {
                return res.sendUserError('Id not found.')
            } else if (product.owner == req.user._id){   
            let productToReplace = req.body;
            let pid = req.params.pid;
            let update = await productDB.updateOneProduct({pid},productToReplace);
            if (!update){
                return res.sendUserError('Error al actualizar el producto.')
            } else{
                return res.sendSuccess('Product updated successfully');
    
            }
            } else {
                return res.sendUserError('Not authorizedd.')
            }
        } catch (error) {
            log.error('Internal server error.');
            res.sendServerError()
        }
    }
    return res.sendUserError('Not authorized.')
}

const deleteProduct = async (req, res) => {
    if (req.user.role = 'admin'){

    try {
        let product = await productDB.findProductById(req.params.pid)
        if (!product) {
            return res.sendUserError('Id not found.')
        } else {    
        let pid = req.params.pid;
        let deleted = await productDB.deleteOneProduct({pid});
        if (!deleted){
            return res.sendUserError('Error al eliminar el producto.')
        } else{
            return res.sendSuccess('Product deleted successfully');
        }
        }
    } 
     catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
    } else if (req.user.role = 'premium') {
        try {
            let product = await productDB.findProductById(req.params.pid)
            if (!product) {
                return res.sendUserError('Id not found.')
            } else if (product.owner == req.user._id){    
            let pid = req.params.pid;
            let deleted = await productDB.deleteOneProduct({pid});
            if (!deleted){
                return res.sendUserError('Error al eliminar el producto.')
            } else{
                return res.sendSuccess('Product deleted successfully');
            }
            } else {
                return res.sendUserError('Not authorizedd.')
            }
        } 
         catch (error) {
            log.error('Internal server error.');
            res.sendServerError()
        }
    }
    return res.sendUserError('Not authorized.')
}

const mockingproducts = async (req, res) => {
    try {
        let product = await productDB.mockProducts()
        if (!product) {
            return res.sendUserError('Id not found.')
        } else {    
            return res.sendSuccess(product);
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

export{
    getProducts,
    getProductsById,
    addProduct,
    updateProduct,
    deleteProduct,
    mockingproducts
}