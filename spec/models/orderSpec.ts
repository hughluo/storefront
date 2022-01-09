import { Order, OrderProduct, OrderStore } from '../../src/models/order'
import { User } from '../../src/models/user'
import { createTestUser} from './userSpec'
import { createTestProduct, testProductName, testProductPrice } from './productSpec'
import { dbm } from '../testUtil'
import { Product } from '../../src/models/product'

let user: User
let product: Product
let order: Order
let orderProduct: OrderProduct
const quantity = 42

const store = new OrderStore()

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

  it('show current order by user id', async () => {
    const showedProduct = await store.showCurrentOrderByUserId(user.id)
    expect(showedProduct[0]).toEqual(orderProduct)
  })
})