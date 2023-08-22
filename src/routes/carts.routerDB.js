import Routers from "./router.js";
import {addNewCart, addProductToCart, deleteAllProductsFromCart, deleteOneProductFromCart, getCartById, getCarts, updateCart, updateProductQuantity} from "../controllers/carts.controller.js"

export default class ProductsRouter extends Routers{
    init(){
        this.post('/', ["PUBLIC"], addNewCart);

        this.get('/', ["PUBLIC"], getCarts);

        this.get('/:cid', ["PUBLIC"], getCartById);

        this.post('/:cid/product/:pid', ["USER"], addProductToCart);

        this.put('/:cid', ["USER"], updateCart);

        this.put('/:cid/product/:pid', ["USER"], updateProductQuantity);

        this.delete('/:cid/product/:pid', ["USER"], deleteOneProductFromCart);

        this.delete('/:cid', ["USER"], deleteAllProductsFromCart);

    }
}