import * as express from 'express';
import { Request, Response} from "express";
import AuthMiddleWare from '../middleware/auth.middleware'

class ProtectedController {
    public path = '/protected'
    public router = express.Router()
    private authMiddleWare: AuthMiddleWare

    constructor() {
        this.authMiddleWare = new AuthMiddleWare()
        this.initRoutes()
    }

    private initRoutes(){
        this.router.use(this.authMiddleWare.verifyToken)
        this.router.get('/secret', this.home)
    }

    home(req: Request, res: Response){
        res.send("This is a protected page")
    }
}

export default ProtectedController;