import * as express from 'express';

import { Request, Response} from "express";

class HomeController {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    private initRoutes(){
        this.router.get('/', this.home)
    }

    home(req: Request, res: Response){
        res.send("Your app is working!")
    }
}

export default HomeController;