import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default {
  async show(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader)
      return response.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if(!(parts.length === 2))
      return response.status(401).send({ error: 'Token error' });

    const [ schema, token ] = parts;

    if (!/^Bearer$^/i.test(schema))
      return response.status(401).send({ error: 'Token malformato' });

    jwt.verify(token, authConfig.auth, (err, decoded) => {
      if (err) return response.status(401).send({ error: 'Token invalid' });
          
    });
  }
}