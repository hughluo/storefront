import client from '../database'

export type Order = {
  id: string
  status: string
  user_id: string
}

export type OrderProduct = {
  id: string
  quantity: number
  product_id: string
  order_id: string
}

export class OrderStore {
  showCurrentOrderByUserId = async (
    userId: string,
  ): Promise<Array<OrderProduct>> => {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT order_products.id, order_products.quantity, order_products.product_id, order_products.order_id FROM orders INNER JOIN order_products ON (SELECT id FROM orders WHERE user_id=($1) AND order_status=($2) ORDER BY id DESC LIMIT 1)=order_products.order_id'
      const result = await conn.query(sql, [userId, 'active'])
      const orderProducts = result.rows
      conn.release()

      return orderProducts
    } catch (err) {
      throw new Error(
        `failed to show lastest active order products with user_id<${userId}>: ${err}`,
      )
    }
  }

  createOrderProduct = async (
    order_id: string,
    product_id: string,
    quantity: number,
  ): Promise<OrderProduct> => {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'

      const result = await conn.query(sql, [order_id, product_id, quantity])
      const orderProduct = result.rows[0]

      conn.release()
      return orderProduct
    } catch (err) {
      throw new Error(
        `failed to create orderProduct with order_id<${order_id}> product_id<${product_id}> quantity<${quantity}>: ${err}`,
      )
    }
  }

  createOrder = async (userId: string, status: string): Promise<Order> => {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *'

      const result = await conn.query(sql, [userId, status])
      const order = result.rows[0]

      conn.release()
      return order
    } catch (err) {
      throw new Error(
        `failed to create order with user_id<${userId}> status<${status}>: ${err}`,
      )
    }
  }
}
