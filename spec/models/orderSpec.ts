import { Order, OrderProduct, OrderStore } from '../../src/models/order'
import { User } from '../../src/models/user'
import { createTestUser, deleteTestUser } from './userSpec'
import { createTestProduct } from './productSpec'
import { dbm } from '../testUtil'
import { Product } from '../../src/models/product'

const store = new OrderStore()

export const testProductName = 'MagicCookie'
export const testProductPrice = 20

let user: User
let product: Product
let order: Order
let orderProduct: OrderProduct
const quantity = 42


describe('Test OrderStore', () => {
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

  it('show product', async () => {
    const showedProduct = await store.showLatestActiveOrderProducts(user.id)
    expect(showedProduct[0]).toEqual(orderProduct)
  })
})