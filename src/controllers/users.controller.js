import jwt from 'jsonwebtoken';
import config from '../config/config.js'
import { userDB } from '../dao/factory.js'
import usersDTO from '../dto/users.dto.js';


const privateKey = config.privateKey

const renderLogin = (req, res) => {
    res.render('login')
}

const login = (req, res) => {
    const {firstname, lastname, email, age, role} = req.user;
    let userData = new usersDTO({firstname, lastname, email, age, role})
    try {
        const token = jwt.sign({userData}, privateKey, { expiresIn: '1h' });
        res.cookie('cookieToken', token, { maxAge: 3600000, httpOnly: true });
        res.redirect('/products');
    } catch (error){
        log.error('Internal server error.')
        res.sendServerError()
    }
}

const logout = (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('cookieToken').redirect('/login');
    } catch (error){
        log.error('Internal server error.')
        res.sendServerError()
    }
}

const renderRecovery = (req, res) => {
    res.render('recovery')
}

const recovery = async (req, res) => {
    const {email, password} = req.body;
    try {
        const recovery = await userDB.recover(email,password);
        if (recovery){
            res.redirect('/login');
        } else{
            res.sendUserError('Error al restablecer la contraseña');
        }
    } catch (error) {
        log.error('Internal server error.')
        res.sendServerError()
    }
}

export {
    login,
    renderLogin,
    logout,
    recovery,
    renderRecovery
}