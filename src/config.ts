import dotenv from 'dotenv'

dotenv.config()

const { PEPPER, SALT_ROUNDS, JWT_SECRET } = process.env

export const PEPPER_STR = PEPPER as string
export const JWT_SECRET_STR = JWT_SECRET as string
export const SALT_ROUNDS_NUM = parseInt(SALT_ROUNDS as unknown as string)
