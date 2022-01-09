import client from '../database'

export type Product = {
  id: string
  name: string
  price: number
}

export class ProductStore {
  index = async (): Promise<Array<Product>> => {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)
      const products = result.rows

      conn.release()
      return products
    } catch (err) {
      throw new Error(`failed to index products: ${err}`)
    }
  }

  show = async (id: string): Promise<Product> => {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'

      const result = await conn.query(sql, [id])
      const product = result.rows[0]

      conn.release()
      return product
    } catch (err) {
      throw new Error(`failed to show product with id<${id}>: ${err}`)
    }
  }

  create = async (name: string, price: number): Promise<Product> => {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'

      const result = await conn.query(sql, [name, price])
      const product = result.rows[0]

      conn.release()
      return product
    } catch (err) {
      throw new Error(
        `failed to create product with name<${name}> price<${price}>: ${err}`,
      )
    }
  }

  delete = async (id: string): Promise<number> => {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM products where id=($1)'

      const result = await conn.query(sql, [id])
      const deletedRowCount = result.rowCount

      conn.release()
      return deletedRowCount
    } catch (err) {
      throw new Error(`unable delete product with id<${id}>: ${err}`)
    }
  }
}
