import Routers from "./router.js";
import passport from 'passport';
import __dirname from '../utils.js';
import {login, renderLogin, logout, recovery, renderRecovery} from "../controllers/users.controller.js"
import {index, home, chat, realTimeProducts, carts, products, getLogs,passwordRecover,recoverPassword,resetPassword,changeRole} from "../controllers/views.controller.js"
import { isUserOrTokenValid } from "../middlewares/user.middlewares.js";

export default class ViewsRouter extends Routers{
    init(){
        this.post('/register',["PUBLIC"], passport.authenticate('register', {successRedirect: '/login', failureRedirect: '/', failureFlash: true}))

        this.post('/passwordRecover',["PUBLIC"], passwordRecover);

        this.get('/recoverPassword',["PUBLIC"], recoverPassword);

        this.post('/resetPassword',["PUBLIC"], isUserOrTokenValid ,resetPassword);

        this.get('/', ["PUBLIC"], index)

        this.get('/login', ["PUBLIC"], renderLogin);

        this.post('/login', ["PUBLIC"], passport.authenticate('login'), login)

        this.get('/logout', ["USER", "ADMIN", "PREMIUM"], logout);

        this.get('/recovery', ["PUBLIC"], renderRecovery)

        this.post('/recovery', ["PUBLIC"], recovery)

        this.get('/home', ["PUBLIC"], home);

        this.get('/chat', ["USER"], chat)

        this.get('/realtimeproducts', ["USER", "ADMIN", "PREMIUM"], realTimeProducts);

        this.get('/carts', ["USER", "ADMIN", "PREMIUM"], carts);

        this.get('/products', ["USER", "ADMIN", "PREMIUM"], products)

        this.get('/logerTest', ["PUBLIC"], getLogs)
        
        this.get('/premium', ["USER", "ADMIN"], changeRole)
    }
}