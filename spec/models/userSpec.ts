import dotenv from 'dotenv'
import { User, UserStore } from '../../src/models/user'
import { dbm } from '../testUtil'

const store = new UserStore

dotenv.config()

const {TEST_EMAIL, TEST_FIRSTNAME, TEST_LASTNAME, TEST_PASSWORD, TEST_JWT} = process.env

export const testUserEmail = TEST_EMAIL as string
export const testUserFirstname = TEST_FIRSTNAME as string
export const testUserLastname = TEST_LASTNAME as string
export const testUserPassword = TEST_PASSWORD as string
export const testJwt = TEST_JWT as string

export const createTestUser = async (): Promise<User> => {
    const gotUser = await store.create(testUserEmail, testUserFirstname, testUserLastname, testUserPassword)
    expect(gotUser.firstname).toBe(testUserFirstname)
    expect(gotUser.lastname).toBe(testUserLastname)
    expect(gotUser.email).toBe(testUserEmail)
    return gotUser
}

export const deleteTestUser = async () => {
    const deletedRowCount = await store.deleteByEmail(testUserEmail)
    expect(deletedRowCount).toBe(1)
}

describe('Test UserStore', () => {

  beforeAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
  })

  afterAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
  })

  it('create user then delete', async () => {
    await createTestUser()
    await deleteTestUser()
  })

  it('index users', async () => {
    const user = await createTestUser()
    const users = await store.index()
    expect(users).toHaveSize(1)
    const user0 = users[0]
    expect(user0.email).toBe(user.email)
    expect(user0.firstname).toBe(user.firstname)
    expect(user0.lastname).toBe(user.lastname)
    await deleteTestUser()
  })

  it('show users', async () => {
    const user = await createTestUser()
    const showedUser = await store.show(user.id)
    expect(showedUser.email).toBe(user.email)
    expect(showedUser.firstname).toBe(user.firstname)
    expect(showedUser.lastname).toBe(user.lastname)
    await deleteTestUser()
  })

  it('auth user', async () => {
    await createTestUser()
    const authRes = await store.authenticate(testUserEmail, testUserPassword)
    
    expect(authRes).toBeDefined()
    await deleteTestUser()
  })
})