import supertest from 'supertest'
import { app } from '../../src/server'
import { createTestUser, testJwt } from '../models/userSpec'
import { testProductName, testProductPrice, createTestProduct, deleteTestProduct } from '../models/productSpec'
import { dbm } from '../testUtil'
import { Order, OrderProduct, OrderStore } from '../../src/models/order'
import { Product } from '../../src/models/product'
import { User } from '../../src/models/user'

let user: User
let product: Product
let order: Order
let orderProduct: OrderProduct
const quantity = 42

const request = supertest(app)
const store = new OrderStore()

describe('Test orders handler', () => {

  beforeAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
    
    user = await createTestUser()
    product = await createTestProduct(testProductName, testProductPrice)
    order = await store.createOrder(user.id, 'active')
    orderProduct = await store.createOrderProduct(order.id, product.id, quantity)
  })

  afterAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
  })

  it('show current order by user id with jwt', async () => {
    const response = await (request.get(`/orders/${user.id}`).set('Authorization', `Bearer ${testJwt}`))
    expect(response.status).toBe(200)
    expect(response.body[0]).toEqual(orderProduct)
  })
})