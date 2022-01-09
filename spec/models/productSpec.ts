import { Product, ProductStore } from '../../src/models/product'

const store = new ProductStore

export const testProductName = 'MagicCookie'
export const testProductPrice = 20

export const createTestProduct = async (name: string, price: number): Promise<Product> => {
  const gotProduct = await store.create(name, price)
  expect(gotProduct.name).toBe(name)
  expect(gotProduct.price).toBe(price)
  return gotProduct
}

export const deleteTestProduct = async (id: string) => {
  const deletedRowCount = await store.delete(id)
  expect(deletedRowCount).toBe(1)
}

describe('Test ProductStore', () => {

  it('create product', async () => {
    const product = await createTestProduct(testProductName, testProductPrice)
    await deleteTestProduct(product.id)
  })

  it('show product', async () => {
    const product = await createTestProduct(testProductName, testProductPrice)
    const showedProduct = await store.show(product.id)
    expect(product).toEqual(showedProduct)
    await deleteTestProduct(product.id)
  })
  
  it('index product', async () => {
    const p1Name = 'p1'
    const p1Price = 10
    const p2Name = 'p2'
    const p2Price = 20
    const p1 = await createTestProduct(p1Name, p1Price)
    const p2 = await createTestProduct(p2Name, p2Price)

    const products = await store.index()
    expect(products).toHaveSize(2)
    expect(products).toContain(p1)
    expect(products).toContain(p2)

    await deleteTestProduct(p1.id)
    await deleteTestProduct(p2.id)
  })
})