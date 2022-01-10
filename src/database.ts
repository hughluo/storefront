import { Pool } from 'pg'
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './config'

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  port: parseInt(POSTGRES_PORT as string),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
})

export default client
