import App from './app';
import config from "../util/config";

import * as bodyParser from "body-parser";

import AuthController from "./controllers/auth.controller";
import HomeController from './controllers/home.controller';
import ProtectedController from "./controllers/protected.controller";

const app = new App({
    port: config.server.port,
    controllers: [
        new ProtectedController(),
        new HomeController(),
        new AuthController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    ],
})
//I cant make this "use" in routes, I dont know why
app.app.use("/", (req, res) => {
    res.render("index");
});
app.listen()
