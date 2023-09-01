import Routers from "./router.js";
import passport from 'passport';
import __dirname from '../utils.js';
import {index, home, chat, realTimeProducts, carts, products, getLogs} from "../controllers/views.controller.js"

export default class ViewsRouter extends Routers{
    init(){

        this.get('/', ["PUBLIC"], index)

        this.get('/home', ["PUBLIC"], home);

        this.get('/chat', ["USER"], chat)

        this.get('/realtimeproducts', ["USER", "ADMIN", "PREMIUM"], realTimeProducts);

        this.get('/carts', ["USER", "ADMIN", "PREMIUM"], carts);

        this.get('/products', ["USER", "ADMIN", "PREMIUM"], products)

        this.get('/logerTest', ["PUBLIC"], getLogs)

    }
}