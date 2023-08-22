import Routers from "./router.js";
import passport from 'passport';
import __dirname from '../utils.js';
import {login, renderLogin, logout,renderRecovery,passwordRecover,recoverPassword,resetPassword,changeRole} from "../controllers/users.controller.js"
import { isUserOrTokenValid } from "../middlewares/user.middlewares.js";

export default class UsersRouter extends Routers{
    init(){

        this.post('/passwordRecover',["PUBLIC"], passwordRecover);

        this.get('/recoverPassword',["PUBLIC"], recoverPassword);

        this.post('/resetPassword',["PUBLIC"], isUserOrTokenValid ,resetPassword);

        this.get('/recovery', ["PUBLIC"], renderRecovery)

        this.post('/register',["PUBLIC"], passport.authenticate('register', {successRedirect: '/api/users/login', failureRedirect: '/', failureFlash: true}))

        this.get('/login', ["PUBLIC"], renderLogin);

        this.post('/login', ["PUBLIC"], passport.authenticate('login'), login)

        this.get('/logout', ["USER", "ADMIN", "PREMIUM"], logout);

        this.get('/premium', ["PREMIUM", "ADMIN"], changeRole)
    }
}