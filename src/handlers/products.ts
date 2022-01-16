import express, { Request, Response } from 'express'
import { ProductStore } from '../models/product'
import { verifyAuthToken } from './users'

const store = new ProductStore()

const create = async (req: Request, res: Response) => {
  const { name, price } = req.body
  try {
    const newProduct = await store.create(name, price)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(`Failed to create product: ${err}`)
  }
}

const index = async (_: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400)
    res.json(`Failed to index products: ${err}`)
  }
}

const show = async (req: Request, res: Response) => {
  const id = req.params.id as string
  try {
    const showedProduct = await store.show(id)
    res.json(showedProduct)
  } catch (err) {
    res.status(400)
    res.json(`Failed to show product: ${err}`)
  }
}

export const productsRoutes = (app: express.Application) => {
  app.post('/products', verifyAuthToken, create)
  app.get('/products', index)
  app.get('/products/:id', show)
}
