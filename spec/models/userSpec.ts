import { User, UserStore } from '../../src/models/user'

const store = new UserStore
describe('Test UserStore', () => {

  it('create user', async () => {
    const gotUser = await store.create('tom', '42')
    expect(gotUser.username).toEqual('tom')
  })

  it('auth user', async () => {
    const gotUser = await store.authenticate('tom', '42')
    expect(gotUser).toBeDefined()
  })
})