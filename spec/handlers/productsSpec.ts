import supertest from 'supertest'
import { app } from '../../src/server'
import { testJwt } from '../models/userSpec'
import { testProductName, testProductPrice, createTestProduct, deleteTestProduct } from '../models/productSpec'


const request = supertest(app)
describe('Test product handler', () => {

  it('create product with jwt token', async () => {
    const response = await (request.post('/products').set('Authorization', `Bearer ${testJwt}` ).send({name: testProductName, price: testProductPrice}))
    expect(response.status).toBe(200)

    deleteTestProduct(response.body.id)
  })

  it('create product without jwt token', async () => {
    const response = await (request.post('/products').send({name: testProductName, price: testProductPrice}))
    expect(response.status).toBe(401)
  })

  it('index products', async () => {
    const p1Name = 'p1'
    const p1Price = 10
    const p2Name = 'p2'
    const p2Price = 20
    const p1 = await createTestProduct(p1Name, p1Price)
    const p2 = await createTestProduct(p2Name, p2Price)

    const response = await request.get('/products')
    const products = response.body
    expect(products).toHaveSize(2)
    expect(products).toContain(p1)
    expect(products).toContain(p2)
    expect(response.status).toBe(200)

    await deleteTestProduct(p1.id)
    await deleteTestProduct(p2.id)
  })

  it('show product', async () => {
    const product = await createTestProduct(testProductName, testProductPrice)
    
    const response = await request.get(`/products/${product.id}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe(product.name)
    expect(response.body.price).toBe(product.price)

    await deleteTestProduct(product.id)
  })
})