import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import { JWT_SECRET_STR } from '../config'

const store = new UserStore()

const create = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const newUser = await store.create(username, password)
    var token = jwt.sign({ user: newUser }, JWT_SECRET_STR)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(`${err} + user`)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const u = await store.authenticate(username, password)
    if (!u) {
      res.status(401)
      res.json('User not exist or wrong password')
      return
    }
    var token = jwt.sign({ user: u }, JWT_SECRET_STR)
    res.json(token)
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

export const userRoutes = (app: express.Application) => {
  app.post('/users', verifyAuthToken, create)
  app.post('/auth', authenticate)
}

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    const verifiedPayload = jwt.verify(token, JWT_SECRET_STR)
    next()
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
