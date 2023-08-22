import {Router} from "express";
import jwt from "jsonwebtoken"

export default class Routers{
    constructor(){
        this.router= Router();
        this.init()
    }
    getRouter(){
        return this.router;
    }
    init(){}
    get(path, policies, ...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    post(path, policies, ...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    put(path, policies, ...callbacks){
        this.router.put(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    delete(path, policies, ...callbacks){
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
    }
    applyCallbacks(callbacks){
        return  callbacks.map((callback) => async(...params)=>{
            try {
                await callback.apply(this, params)
            }catch(error){
                console.log(error)

                params[1].status(500).send(error)
            }
        })
    }
    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = payload => res.status(200).send({status:"success", payload})
        res.sendServerError = error => res.status(500).send({status: "error", error})
        res.sendUserError = error => res.status(400).send({status: "error", error})
        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if(policies[0] === "PUBLIC") return next()
        const token = req.cookies.cookieToken
        if(!token) return res.status(401).send({status:"error", error:"Denied acces"})
        let user = jwt.verify(token, 'SecretCode')
        if(!policies.includes(user.userData.role.toUpperCase())) return res.status(403).send({error:"Unauthorized"})
        req.user=user
        next();
    }
}