import supertest from 'supertest'
import { app } from '../../../server'

const agent = supertest.agent(app)

export {
    agent
}

