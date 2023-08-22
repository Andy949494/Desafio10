import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import userModel from '../dao/models/users.model.js';

const initializePassport = () => {
  passport.use('register', new LocalStrategy(
    { passReqToCallback:true, usernameField: 'email' },
    async (req, username, password, done) => {
      
      console.log(req)
      const {firstname, lastname, age} = req.body

      try {
        const user = await userModel.findOne({ email: username });
        if (user) {
          return done(null, false, { message: 'Correo electrónico ya registrado.' });
        }

        const newUser = {
          firstname, 
          lastname, 
          email: username, 
          age, 
          password: createHash(password),
          cart: null,
        }

        const result = await userModel.create(newUser)

        return done(null, result);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.use('login',new LocalStrategy(
    { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'Correo electrónico incorrecto.' });
          }
          
          const passwordMatch = isValidPassword(user, password);
          if (!passwordMatch) {
            return done(null, false, { message: 'Contraseña incorrecta.' });
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
      }
    }
  ));

  passport.use('github', new GitHubStrategy({
      clientID:"Iv1.32bb3918efe75a2e",
      clientSecret:'898855e1f66af75ebee9b7adb745a2a3b99d0b73',
      callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
  },async (accessToken,refreshToken,profile, done) => {
        try {
          console.log(profile);
          let user = await userModel.findOne({ email: profile._json.email });
          if (!user) {   
          let newUser = {
            firstname:profile._json.name, 
            lastname:'',
            age:'',
            email:profile._json.email, 
            password:'',
            cart: null,
          }
          let result = await userModel.create(newUser);
          done(null,result);
      }
      else{
          done(null,user);
      }  
      }catch (error) {
          return done(error);
        }
  }
  ))
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
export default initializePassport