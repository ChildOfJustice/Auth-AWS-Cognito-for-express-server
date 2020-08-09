import * as express from 'express';
import { Application } from 'express';

class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number; controllers: any; middleWares: any }) {
        this.app = express()
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
