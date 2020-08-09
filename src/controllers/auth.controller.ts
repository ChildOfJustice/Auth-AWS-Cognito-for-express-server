import * as express from "express";
import { Request, Response } from 'express';
import {body, ValidationChain, validationResult} from "express-validator";

import CognitoService from '../services/cognito.service';

class AuthController {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post('/signUp', this.validateBody('signUp'), this.signUp)
        this.router.post('/signIn', this.validateBody('signIn'), this.signIn)
        this.router.post('/verify', this.validateBody('verify'), this.verify)
    }


    signUp(req: Request, res: Response){
        const result = validationResult(req);
        console.log("SIGN UP REQUEST: ");
        console.log(req.body);
        if(!result.isEmpty()){
            return res.status(422).json({errors: result.array()})
        }

        const { username, password, email, name, family_name, birthdate } = req.body;
        let userAttr = [];
        userAttr.push({ Name: 'email', Value: email });
        userAttr.push({ Name: 'name', Value: name });
        userAttr.push({ Name: 'family_name', Value: family_name });
        userAttr.push({ Name: 'birthdate', Value: birthdate });

        const cognito = new CognitoService();

        cognito.signUpUser(username, password, userAttr)
            .then(success =>{
                if(success){
                    res.status(200).json({"response": "successfully added a new user to AWS UserPool"}).end()
                } else {
                    res.status(500).json({"Internal server error": "see app logs for more information"}).end()
                }
            });

    }
    signIn(req: Request, res: Response){
        const result = validationResult(req);
        console.log("SIGN IN REQUEST: ");
        console.log(req.body);

        if(!result.isEmpty()){
            return res.status(422).json({errors: result.array()})
        }

        const { username, password } = req.body;
        const cognito = new CognitoService();
        cognito.signInUser(username, password)
            .then(success =>{
                if(success){
                    res.status(200).json({"response": "successfully signed in the user"}).end()
                } else {
                    res.status(500).json({"Internal server error": "see app logs for more information"}).end()
                }
            });

    }
    verify(req: Request, res: Response){
        const result = validationResult(req);
        console.log("VERIFY REQUEST: ");
        console.log(req.body);

        if(!result.isEmpty()){
            return res.status(422).json({errors: result.array()})
        }

        const { username, code } = req.body;
        const cognito = new CognitoService();
        cognito.verifyAccount(username, code)
            .then(success =>{
                if(success){
                    res.status(200).json({"response": "successfully verified the user"}).end()
                } else {
                    res.status(500).json({"Internal server error": "see app logs for more information"}).end()
                }
            });

    }


    private validateBody(type: string): ValidationChain[]{
        switch (type) {
            case 'signUp':
                return [
                    body('username').notEmpty().isLength({ min: 6}),
                    body('email').notEmpty().normalizeEmail().isEmail(),
                    body('password').isString().isLength({ min: 8}),
                    body('birthdate').exists().isISO8601(),
                    body('name').notEmpty().isString(),
                    body('family_name').notEmpty().isString(),
                ]
            case 'signIn':
                return [
                    body('username').notEmpty().isLength({ min: 6}),
                    body('password').isString().isLength({ min: 8}),
                ]
            case 'verify':
                return [
                    body('username').notEmpty().isLength({ min: 6}),
                    body('code').isString().isLength({ min: 6, max: 6}),
                ]
        }
        return []
    }
}

export default AuthController;