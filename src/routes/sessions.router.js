import passport from 'passport';
import Routers from "./router.js";


export default class SessionsRouter extends Routers{
    init(){ 
        this.get('/github',passport.authenticate('github',{scope:['user:email']}),async(req,res)=>{})

        this.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
            req.session.user = req.user;
            res.redirect('/');
        })

        this.get('/current', ["USER", "ADMIN"], (req, res) => {
            res.sendSuccess(req.user);
        });
    }
}