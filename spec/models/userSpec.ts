import { assert } from 'console'
import exp from 'constants'
import { User, UserStore } from '../../src/models/user'

const store = new UserStore

export const testUsername = 'i-am-just-a-poor-boy-nobody-loves-me'
export const testPassword = 'easy-come-easy-go'

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