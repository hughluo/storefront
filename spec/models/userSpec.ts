import { User, UserStore } from '../../src/models/user'

const store = new UserStore
const testUser: User = {username: 'tom', password: '42'}
describe('Test UserStore', () => {

  it('create user', async () => {
    const gotUser = await store.create(testUser)
    expect(gotUser.username).toEqual(testUser.username)
  })

  it('auth user', async () => {
    const gotUser = await store.authenticate(testUser.username, testUser.password)
    expect(gotUser).toBeDefined()
  })
})