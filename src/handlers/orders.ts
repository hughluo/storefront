import express, { Request, Response } from 'express'
import { OrderStore } from '../models/order'
import { verifyAuthToken } from './users'

const store = new OrderStore()

const showCurrentOrderByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string
    if (!userId) {
      throw new Error('missing userId')
    }
    const order = await store.showCurrentOrderByUserId(userId)
    res.json(order)
  } catch (err) {
    res.status(400)
    res.json(`Failed to show product: ${err}`)
  }
}

export const ordersRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, showCurrentOrderByUserId)
}
