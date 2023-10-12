import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){ // NextFunction vai executar e depois chamar a function seguinte
  const authorizationHeader = req.headers.authorization // Obteve o token do cabecalho da requisição

  if(!authorizationHeader) return res.status(401).json({message: 'Não autorizado: nenhum token foi encontrado'})

  const token = authorizationHeader.replace(/Bearer /, '') // Cortando o Bearer pois devolve o bearer antes do token

  jwtService.verifyToken(token, (err, decoded) =>{
    if(err || typeof decoded === 'undefined') return res.status(401).json({message: 'Não autorizado: token inválido'})

    userService.finByEmail((decoded as JwtPayload).email).then(user =>{  // Decoded tem o email do usuario (decod = payload)
      req.user = user
      next()
    })
  } )
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const { token } = req.query

  if(!token) return res.status(401).json({message: 'Não autorizado: nenhum token foi encontrado'})

  if(typeof token !== 'string') return res.status(401).json({message: 'O parâmetro token deve ser do tipo string'})

  jwtService.verifyToken(token, async (err, decoded) =>{
    if(err || typeof decoded === 'undefined') return res.status(401).json({message: 'Não autorizado: token inválido'})

    const user = await userService.finByEmail((decoded as JwtPayload).email)  // Decoded tem o email do usuario (decod = payload)
      req.user = user
      next()
    })
  } 