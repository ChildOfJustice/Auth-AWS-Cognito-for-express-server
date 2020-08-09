import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as jwkToPem from 'jwk-to-pem'
import * as fetch from 'node-fetch'
import config from "../../util/config";

let pems: any = {}

class AuthMiddleware{
    private userPoolId = config.userPoolId
    private userPoolRegion = config.userPoolRegion

    constructor() {
        this.setUp()
    }

    verifyToken(req: Request, res: Response, next: () => void): void {
        const token = req.header('Auth')

        if(token == null) res.status(401).end()
        else {

            let decodeJwt: any = jwt.decode(token, {complete: true})
            if (!decodeJwt) {
                res.status(401).end()
            }

            let kid = decodeJwt.header.kid
            let pem = pems[kid]
            if (!pem) {
                res.status(401).end()
            }

            jwt.verify(token, pem, (err: any, payload: any) => {
                if (err) {
                    res.status(401).end()
                }
                next()
            })
        }
    }

    private async setUp() {
        const URL = `https://cognito-idp.${this.userPoolRegion}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`

        try{
            // @ts-ignore
            const response = await fetch(URL);
            if (response.status !== 200){
                throw `request not successful`
            }
            const data = await response.json()
            const { keys } = data
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index]
                const key_id = key.kid
                const modulus = key.n
                const exponent = key.e
                const key_type = key.kty
                const jwk = { kty: key_type, n: modulus, e: exponent }
                const pem = jwkToPem(jwk)
                pems[key_id] = pem

            }

            console.log("got all pems")
        } catch (error) {
            console.log("cannot get pems")
            console.log(error)
        }


    }
}

export default AuthMiddleware;