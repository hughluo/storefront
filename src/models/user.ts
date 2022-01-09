import bcrypt from 'bcrypt'
import client from '../database'
import { PEPPER_STR, SALT_ROUNDS_NUM } from '../config'

export type User = {
  username: string
  password_digest: string
}

export class UserStore {
  create = async (username: string, password: string): Promise<User> => {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'

      const hash = bcrypt.hashSync(password + PEPPER_STR, SALT_ROUNDS_NUM)

      const result = await conn.query(sql, [username, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`unable create user with username<${username}>: ${err}`)
    }
  }

  delete = async (username: string): Promise<number> => {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users where username=($1)'

      const result = await conn.query(sql, [username])
      const deletedRowCount = result.rowCount

      conn.release()
      return deletedRowCount
    } catch (err) {
      throw new Error(`unable delete user with username<${username}>: ${err}`)
    }
  }

  authenticate = async (
    username: string,
    password: string,
  ): Promise<User | null> => {
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    if (result.rows.length) {
      const user = result.rows[0]

      if (bcrypt.compareSync(password + PEPPER_STR, user.password_digest)) {
        return user
      }
    }
    return null
  }
}
