import supertest from 'supertest'
import { app } from '../../src/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { testUsername, testPassword, createTestUser, deleteTestUser, testJwt } from '../models/userSpec'


const request = supertest(app)
describe('Test user handler', () => {

  it('create user with jwt token', async () => {
    const response = await (request.post('/users').set('Authorization', `Bearer ${testJwt}` ).send({username: testUsername, password: testPassword}))
    expect(response.status).toBe(200)
    const payload = jwt.decode(response.body) as JwtPayload
    const gotUsername = payload.user.username
    expect(gotUsername).toBe(testUsername)
    await deleteTestUser()
  })

  it('create user without jwt token', async () => {
    const response = await (request.post('/users').send({username: testUsername, password: testPassword}))
    expect(response.status).toBe(401)
  })

  it('auth user', async () => {
    await createTestUser()
    const response = await (request.post('/auth').send({username: testUsername, password: testPassword}))
    expect(response.status).toBe(200)
    await deleteTestUser()
  })

  it('auth user', async () => {
    const response = await (request.post('/auth').send({username: 'non-existing', password: '42'}))
    expect(response.status).toBe(401)
  })
})