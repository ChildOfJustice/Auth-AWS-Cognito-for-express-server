import * as express from 'express';
import { Application } from 'express';
import * as path from "path";
import * as exphbs from "express-handlebars";

class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; controllers: any; middleWares: any }) {
        this.app = express()

        // set static path
        this.app.use("/static", express.static("src/public"));
        //app.use(cors())

        // set template engine
        this.app.set('views', path.join(process.cwd(), '/src', '/views'));
        this.app.engine('handlebars', exphbs());
        this.app.set('view engine', 'handlebars');

        this.port = appInit.port;

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`)
        })
    }

    private middlewares(middleWares: any){
        // @ts-ignore
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: any){
        // @ts-ignore
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router);
        });
    }
}

export default App;
