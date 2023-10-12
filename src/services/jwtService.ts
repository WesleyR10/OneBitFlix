import jwt from 'jsonwebtoken'

const secret = 'chave-do-jwt'

export const jwtService = {
  signToken: (payload: string | object | Buffer , expiration: string) =>{ // Payload e os dados - expiration e a data de expiração
    return jwt.sign(payload, secret, { //jwt.sing (Assinar o token)
      expiresIn: expiration // Data de expiração do token
    }) 
  }  
}