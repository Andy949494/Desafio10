import {productDB, cartDB} from '../dao/factory.js';
import log from '../config/customLogger.js';

const addNewCart = async (req, res) => {
    try {
        let newCart = await cartDB.createCart();
        if (!newCart) {
            customError.createError({
                name: "Error creating cart",
                cause: 'Database error',
                message: "Error trying to create new cart",
                code: EErors.DATABASE_ERROR
            })
        } else {
            return res.sendSuccess(newCart);
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const getCarts = async (req, res) => {
    try {
        let allCarts = await cartDB.findAllCarts();
        if (!allCarts) {
            customError.createError({
                name: "Error searching cart",
                cause: 'Database error',
                message: "Error trying to read all carts",
                code: EErors.DATABASE_ERROR
            })
        } else {
            let limit = req.query.limit;
            if (limit){
                let LimitedProducts = allCarts.slice(0,limit);
                return res.sendSuccess(LimitedProducts);
            } else {
                return res.sendSuccess(allCarts);  
            }
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const getCartById = async (req, res) => {
    try {
        let cid = req.params.cid
        if (!cid){
            customError.createError({
                name: "Wrong cart ID",
                cause: 'Params error - invalid cart ID',
                message: "Error trying to get /:cid",
                code: EErors.INVALID_PARAM
            })
        }
        let cart = await cartDB.findCartById(cid)
        if (!cart) {
            customError.createError({
                name: "Error searching cart",
                cause: 'Database error',
                message: "Error trying to read all carts",
                code: EErors.DATABASE_ERROR
            })
        } else {
            return res.sendSuccess(cart);  
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const addProductToCart = async (req, res) => {
    try {
        let cid = req.params.cid;
        if (!cid){
            customError.createError({
                name: "Wrong cart ID",
                cause: 'Params error - invalid cart ID',
                message: "Error trying to get /:cid",
                code: EErors.INVALID_PARAM
            })
        }
        let pid = req.params.pid;
        if (!pid){
            customError.createError({
                name: "Wrong product ID",
                cause: 'Params error - invalid product ID',
                message: "Error trying to get /:pid",
                code: EErors.INVALID_PARAM
            })
        }
        let product = await productDB.findProductById(pid)
        let cart = await cartDB.findCartById(cid)
        if (product.owner == req.user._id){
            return res.sendUserError('No puede agregar un producto que le pertenece.')
        }
        if (product && cart) {
            const productIndex = cart.products.findIndex((e) => e.product == (pid));
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
            let updatedCart = await cartDB.updateOneCart({cid},cart);
            if(!updatedCart){
                customError.createError({
                    name: "Error updating cart",
                    cause: 'Database error',
                    message: "Error trying to update cart",
                    code: EErors.DATABASE_ERROR
                })
            } else{
                return res.sendSuccess(updatedCart);
            }
        } else {
            cart.products.push({ product: (pid), quantity: 1 });
            let updatedCart = await cartDB.updateOneCart({cid},cart);
            if(!updatedCart){
                customError.createError({
                    name: "Error updating cart",
                    cause: 'Database error',
                    message: "Error trying to update cart",
                    code: EErors.DATABASE_ERROR
                })
            } else{
                return res.sendSuccess(updatedCart);
            }
        }
    } else if (!product){
        customError.createError({
            name: "Error searching product",
            cause: 'Database error',
            message: "Error trying to read product",
            code: EErors.DATABASE_ERROR
        })
        } else if (!cart){
            customError.createError({
                name: "Error searching cart",
                cause: 'Database error',
                message: "Error trying to read cart",
                code: EErors.DATABASE_ERROR
            })
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const updateCart = async (req, res) => {
    try {
        let cart = await cartDB.findCartById(req.params.cid)
        if (!cart) {
            customError.createError({
                name: "Error searching cart",
                cause: 'Database error',
                message: "Error trying to read cart",
                code: EErors.DATABASE_ERROR
            })
        } else {
        let cid = req.params.cid;
        if (!cid){
            customError.createError({
                name: "Wrong cart ID",
                cause: 'Params error - invalid cart ID',
                message: "Error trying to get /:cid",
                code: EErors.INVALID_PARAM
            })
        }    
        let product = req.body;
        if (!product){
            customError.createError({
                name: "Products error",
                cause: 'invalid request type',
                message: "Error trying to get products",
                code: EErors.INVALID_TYPE_ERROR
            })
        }  
        cart.products = product;
        let updatedCart = await cartDB.updateOneCart({cid},cart);
        if(!updatedCart){
            customError.createError({
                name: "Error updating cart",
                cause: 'Database error',
                message: "Error trying to update cart",
                code: EErors.DATABASE_ERROR
            })
        } else{
            return res.sendSuccess('Cart updated successfully');
        }
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const updateProductQuantity = async (req, res) => {
    try {
        let cid = req.params.cid;
        if (!cid){
            customError.createError({
                name: "Wrong cart ID",
                cause: 'Params error - invalid cart ID',
                message: "Error trying to get /:cid",
                code: EErors.INVALID_PARAM
            })
        }
        let pid = req.params.pid;
        if (!pid){
            customError.createError({
                name: "Wrong product ID",
                cause: 'Params error - invalid product ID',
                message: "Error trying to get /:pid",
                code: EErors.INVALID_PARAM
            })
        }
        let newQuantity = parseInt(req.body.quantity);
        if (!newQuantity){
            customError.createError({
                name: "Quantity error",
                cause: 'invalid request type',
                message: "Error trying to get quantity",
                code: EErors.INVALID_TYPE_ERROR
            })
        }  
        let cart = await cartDB.findCartById(cid)
        if (!cart) {
            customError.createError({
                name: "Error searching cart",
                cause: 'Database error',
                message: "Error trying to read cart",
                code: EErors.DATABASE_ERROR
            })
        } else {
            const productIndex = cart.products.findIndex((e) => e.product == (pid));
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;
                let updatedCart = await cartDB.updateOneCart({cid},cart);
                if(!updatedCart){
                    customError.createError({
                        name: "Error updating cart",
                        cause: 'Database error',
                        message: "Error trying to update cart",
                        code: EErors.DATABASE_ERROR
                    })
                } else{
                    return res.sendSuccess('Quantity updated successfully');
                }
            }
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const deleteOneProductFromCart = async (req, res) => {
    try {
        let cid = req.params.cid;
        if (!cid){
            customError.createError({
                name: "Wrong cart ID",
                cause: 'Params error - invalid cart ID',
                message: "Error trying to get /:cid",
                code: EErors.INVALID_PARAM
            })
        }
        let cart = await cartDB.findCartById(cid)
        if (!cart){
            customError.createError({
                name: "Error searching cart",
                cause: 'Database error',
                message: "Error trying to read cart",
                code: EErors.DATABASE_ERROR
                })
        } else {
            const productIndex = cart.products.findIndex((e) => e.product == (req.params.pid));
            if (productIndex !== -1) {
                cart.products.splice(productIndex,1);
                let updatedCart = await cartDB.updateOneCart({cid},cart);
                if(!updatedCart){
                    customError.createError({
                        name: "Error updating cart",
                        cause: 'Database error',
                        message: "Error trying to update cart",
                        code: EErors.DATABASE_ERROR
                    })
                } else{
                    return res.sendSuccess('Product deleted successfully');
                }
            }
        }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}

const deleteAllProductsFromCart = async (req, res) => {
    try {
        let cid = req.params.cid;
        let cart = await cartDB.findCartById(cid)
        if (!cart){
            customError.createError({
            name: "Error searching cart",
            cause: 'Database error',
            message: "Error trying to read cart",
            code: EErors.DATABASE_ERROR
            })
        } else {
            cart.products.splice(0);
            let updatedCart = await cartDB.updateOneCart({cid},cart);
                if(!updatedCart){
                    customError.createError({
                        name: "Error updating cart",
                        cause: 'Database error',
                        message: "Error trying to update cart",
                        code: EErors.DATABASE_ERROR
                    })
                } else{
                    return res.status(200).send('All products deleted successfully');
                }
            }
    } catch (error) {
        log.error('Internal server error.');
        res.sendServerError()
    }
}
export{
    addNewCart,
    getCarts,
    getCartById,
    addProductToCart,
    updateCart,
    updateProductQuantity,
    deleteOneProductFromCart,
    deleteAllProductsFromCart
}