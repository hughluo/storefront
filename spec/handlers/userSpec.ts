import supertest from 'supertest'
import { app } from '../../src/server'
import jwt, { JwtPayload } from 'jsonwebtoken'

const request = supertest(app)
describe('Test user handler', () => {

  it('create user', async () => {
    const response = await (request.post('/users').send({username: 'tom', password: 'jerry'}))
    expect(response.status).toBe(200)
    const payload = jwt.decode(response.body) as JwtPayload
    const username = payload.user.username
    expect(username).toBe('tom')
  })

  it('auth user', async () => {
    const response = await (request.post('/auth').send({username: 'tom', password: 'jerry'}))
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })
})