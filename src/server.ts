import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { usersRoutes } from './handlers/users'
import { productsRoutes } from './handlers/products'
import { ordersRoutes } from './handlers/orders'
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PORT } from './config'

export const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
  console.log(`database ${POSTGRES_DB} on ${POSTGRES_HOST}:${POSTGRES_PORT}`)
})

usersRoutes(app)
productsRoutes(app)
ordersRoutes(app)
