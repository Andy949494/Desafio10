import jwt from 'jsonwebtoken';
import config from '../config/config.js'
import { userDB } from '../dao/factory.js'
import usersDTO from '../dto/users.dto.js';
import { sendRecoverPassword } from '../utils/mail.utils.js';
import { generarToken, validateToken, createHash } from '../utils/validations.utils.js';
import { getUserByEmail,updatePasswordByEmail } from '../dao/mongo/views.mongo.js';
import log from '../config/customLogger.js';
import __dirname from '../utils.js';

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
        res.clearCookie('cookieToken').redirect('/api/users/login');
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
            res.redirect('/api/users/login');
        } else{
            res.sendUserError('Error al restablecer la contraseña');
        }
    } catch (error) {
        log.error('Internal server error.')
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
    login,
    renderLogin,
    logout,
    recovery,
    renderRecovery,
    changeRole,
    recoverPassword,
    resetPassword,
    passwordRecover
}