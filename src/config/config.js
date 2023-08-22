import dotenv from 'dotenv';

dotenv.config();

export default {
    port:process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    privateKey:process.env.PRIVATE_KEY,
    persistence:process.env.PERSISTENCE,
    
    //Token
    token: process.env.JWT_TOKEN,
    
    //Mail
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    
    //MailURL
    baseUrl: process.env.BASE_URL,
    recoverPassword: process.env.RECOVER_PASSWORD
    
}