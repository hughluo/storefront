import supertest from 'supertest'
import { app } from '../../src/server'
import { testUserEmail, testUserFirstname, testUserLastname, testUserPassword, createTestUser, deleteTestUser, testJwt } from '../models/userSpec'
import { dbm } from '../testUtil'


const request = supertest(app)
describe('Test user handler', () => {
  
  beforeAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
  })

  afterAll(async () => {
    await dbm.down(4)
    await dbm.up(4)
  })

  it('create user with jwt token', async () => {
    const response = await (request.post('/users').set('Authorization', `Bearer ${testJwt}` ).send({email: testUserEmail, firstname: testUserFirstname, lastname: testUserLastname, password: testUserPassword}))
    expect(response.status).toBe(200)
    const {email, firstname, lastname} = response.body 
    expect(email).toBe(testUserEmail)
    expect(firstname).toBe(testUserFirstname)
    expect(lastname).toBe(testUserLastname)
    await deleteTestUser()
  })

  it('create user without complete info', async () => {
    const response = await (request.post('/users').send({email: testUserEmail, password: testUserPassword}))
    expect(response.status).toBe(401)
  })

  it('create user without jwt token', async () => {
    const response = await (request.post('/users').send({email: testUserEmail, password: testUserPassword}))
    expect(response.status).toBe(401)
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