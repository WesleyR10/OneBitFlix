import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config/environment'

export const jwtService = {
  signToken: (payload: string | object | Buffer , expiration: string) =>{ // Payload e os dados - expiration e a data de expiração
    return jwt.sign(payload, JWT_KEY, { //jwt.sing (Assinar o token)
      expiresIn: expiration // Data de expiração do token
    }) 
  },

  verifyToken: (token:string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, JWT_KEY, callbackfn)
  }
}