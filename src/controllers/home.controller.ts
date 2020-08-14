import * as express from 'express';

import { Request, Response} from "express";

class HomeController {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    private initRoutes(){
        this.router.get('/', this.home)// WHY NOT "use" instead of "get"???
        this.router.get('/api/test', this.test)
    }

    home(req: Request, res: Response){
        res.render("index");
        //res.send("Your app is working!")
    }

    test(req: Request, res: Response){
        //res.render("index");
        //res.send("Your app has been tested!")
        var msg = "EEEEEEE";
        res.json(msg);
        console.log('Sent the msg!');
    }
}

export default HomeController;