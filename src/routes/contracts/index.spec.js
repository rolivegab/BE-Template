import supertest from "supertest"
import {app} from '../../app'

describe('contracts', () => {
  it('returns all contracts', (done) => {
    supertest(app).get('/contracts').set('profile_id', 1).expect(200, done)
  })

  it('fails if unauthenticated', (done) => {
    supertest(app).get('/contracts').expect(401, done)
  })
})