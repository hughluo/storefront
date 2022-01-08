import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import { JWT_SECRET_STR } from '../config'

const store = new UserStore()

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
    const newUser = await store.create(user)
    var token = jwt.sign({ user: newUser }, JWT_SECRET_STR)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(`${err} + user`)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
    const u = await store.authenticate(user.username, user.password)
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
  app.post('/users', create)
  app.post('/auth', authenticate)
}
