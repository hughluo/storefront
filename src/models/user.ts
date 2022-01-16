import bcrypt from 'bcrypt'
import client from '../database'
import { PEPPER_STR, SALT_ROUNDS_NUM } from '../config'

export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  password_digest: string
}

export class UserStore {
  index = async (): Promise<Array<User>> => {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      const users: Array<User> = result.rows

      conn.release()
      return users
    } catch (err) {
      throw new Error(`failed to index users: ${err}`)
    }
  }

  show = async (id: string): Promise<User> => {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'

      const result = await conn.query(sql, [id])
      const user: User = result.rows[0]

      conn.release()
      return user
    } catch (err) {
      throw new Error(`failed to show user with id<${id}>: ${err}`)
    }
  }

  create = async (
    email: string,
    firstname: string,
    lastname: string,
    password: string,
  ): Promise<User> => {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users (email, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *'
      const hash = bcrypt.hashSync(password + PEPPER_STR, SALT_ROUNDS_NUM)
      const result = await conn.query(sql, [email, firstname, lastname, hash])
      const user: User = result.rows[0]
      // do not return the password_digest
      user.password_digest = ''

      conn.release()
      return user
    } catch (err) {
      throw new Error(
        `failed to create user with email<${email}> firstname<${firstname}> lastname<${lastname}>: ${err}`,
      )
    }
  }

  deleteByEmail = async (email: string): Promise<number> => {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users where email=($1)'
      const result = await conn.query(sql, [email])
      const deletedRowCount: number = result.rowCount

      conn.release()
      return deletedRowCount
    } catch (err) {
      throw new Error(`failed to delete user with email<${email}>: ${err}`)
    }
  }

  authenticate = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE email=($1)'
      const result = await conn.query(sql, [email])
      conn.release()

      if (result.rows.length) {
        const user: User = result.rows[0]
        if (bcrypt.compareSync(password + PEPPER_STR, user.password_digest)) {
          return user
        }
      }
      return null
    } catch (err) {
      throw new Error(
        `failed to authenticate user with email<${email}>: ${err}`,
      )
    }
  }
}
