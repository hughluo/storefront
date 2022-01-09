import dotenv from 'dotenv'
import { User, UserStore } from '../../src/models/user'

const store = new UserStore

dotenv.config()

const {TEST_USERNAME, TEST_PASSWORD, TEST_JWT} = process.env

export const testUsername = TEST_USERNAME as string
export const testPassword = TEST_PASSWORD as string
export const testJwt = TEST_JWT as string

export const createTestUser = async () => {
    const gotUser = await store.create(testUsername, testPassword)
    expect(gotUser.username).toBe(testUsername)
}

export const deleteTestUser = async () => {
    const deletedRowCount = await store.delete(testUsername)
    expect(deletedRowCount).toBe(1)
}

describe('Test UserStore', () => {

  it('create user then delete', async () => {
    await createTestUser()
    await deleteTestUser()
  })

  it('auth user', async () => {
    await createTestUser()
    const authRes = await store.authenticate(testUsername, testPassword)
    expect(authRes).toBeDefined()
    await deleteTestUser()
  })
})