import dotenv from 'dotenv'

dotenv.config()

const { ENV } = process.env

dotenv.config({ path: `.env${ENV}` })

const { PEPPER, SALT_ROUNDS, JWT_SECRET } = process.env

export const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env

export const PEPPER_STR = PEPPER as string
export const JWT_SECRET_STR = JWT_SECRET as string
export const SALT_ROUNDS_NUM = parseInt(SALT_ROUNDS as unknown as string)
