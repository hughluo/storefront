import supertest from 'supertest'
import { app } from '../../src/server'
import { testUserEmail, testUserFirstname, testUserLastname, testUserPassword, createTestUser, deleteTestUser, testJwt } from '../models/userSpec'
import { dbm } from '../testUtil'


const request = supertest(app)
describe('Test users handler', () => {
  
  beforeAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
  })

  afterAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
  })

  it('create user', async () => {
    const response = await (request.post('/users').send({firstname: testUserFirstname, lastname: testUserLastname, email: testUserEmail, password: testUserPassword}))
    expect(response.status).toBe(200)
    await deleteTestUser()
  })

  it('create user without complete info', async () => {
    const response = await (request.post('/users').send({email: testUserEmail, password: testUserPassword}))
    expect(response.status).toBe(401)
  })

  it('index user with jwt token', async () => {
    const user = await createTestUser()
    const response = await (request.get('/users').set('Authorization', `Bearer ${testJwt}`))
    expect(response.status).toBe(200)
    const user0 = response.body[0]
    expect(user0.email).toBe(user.email)
    expect(user0.firstname).toBe(user.firstname)
    expect(user0.lastname).toBe(user.lastname)
    await deleteTestUser()
  })

  it('index user without jwt token', async () => {
    const response = await (request.get('/users'))
    expect(response.status).toBe(401)
  })

  it('show user with jwt token', async () => {
    const user = await createTestUser()
    const response = await (request.get(`/users/${user.id}`).set('Authorization', `Bearer ${testJwt}`))
    expect(response.status).toBe(200)
    const showedUser = response.body
    expect(showedUser.email).toBe(user.email)
    expect(showedUser.firstname).toBe(user.firstname)
    expect(showedUser.lastname).toBe(user.lastname)
    await deleteTestUser()
  })

  it('show user without jwt token', async () => {
    const user = await createTestUser()
    const response = await (request.get(`/users/${user.id}`))
    expect(response.status).toBe(401)
    await deleteTestUser()
  })

  it('auth user with correct password', async () => {
    await createTestUser()
    const response = await (request.post('/auth').send({email: testUserEmail, password: testUserPassword}))
    expect(response.status).toBe(200)
    await deleteTestUser()
  })

  it('auth user with incorrect password', async () => {
    await createTestUser()
    const response = await (request.post('/auth').send({email: testUserEmail, password: "incorrect-password"}))
    expect(response.status).toBe(401)
    await deleteTestUser()
  })

  it('auth user non-existing', async () => {
    const response = await (request.post('/auth').send({email: 'non-existing', password: '42'}))
    expect(response.status).toBe(401)
  })
})