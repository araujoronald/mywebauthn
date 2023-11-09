import { describe, expect, it } from 'vitest'
import { agent } from './setup'

describe('User REST API', () => {

    it('Must create a new user', async () => {
        const response = await agent
            .post('/user')
            .send({ name: 'Araujo' })
            .set('Accept', 'application/json')

        expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
        expect(response.body.name).toEqual('Araujo')
    })
})