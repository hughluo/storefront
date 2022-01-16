import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import { JWT_SECRET_STR } from '../config'

const store = new UserStore()

const index = async (_: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400)
    res.json(`Failed to index users: ${err}`)
  }
}

const show = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const showedUser = await store.show(id)
    res.json(showedUser)
  } catch (err) {
    res.status(400)
    res.json(`Failed to show user: ${err}`)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { email, firstname, lastname, password } = req.body
    if (!email || !firstname || !lastname || !password) {
      throw new Error(
        `failed to create user with email<${email}> firstname<${firstname}> lastname<${lastname}>: 
        must have not-null field "email", "firstname", "lastname", "password`,
      )
    }
    const newUser = await store.create(email, firstname, lastname, password)
    res.json(newUser)
  } catch (err) {
    res.status(401)
    res.json(`${err}`)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const u = await store.authenticate(email, password)
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

export const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.post('/auth', authenticate)
}

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    if (!authorizationHeader) {
      res
        .status(401)
        .send('Failed to verify jwt token: missing authorization hearder')
      return
    }
    const token = authorizationHeader.split(' ')[1]
    const verifiedPayload = jwt.verify(token, JWT_SECRET_STR)
    next()
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
