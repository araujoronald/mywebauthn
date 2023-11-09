import { describe, expect, it } from 'vitest'
import RelyingParty from '../../../domain/entities/RelyingParty'
import { agent } from './setup'


describe('Registration REST API', () => {

    it('Must get a registration options', async () => {

        const responseUser = await agent
            .post('/user')
            .send({ name: 'Araujo' })
            .set('Accept', 'application/json')
        expect(responseUser.status).toBe(200)

        const response = await agent
            .get(`/registration/${responseUser.body.id}`)
            .set('Accept', 'application/json')


        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.rp.id).toEqual(RelyingParty.ID)
        expect(response.body.rp.name).toEqual(RelyingParty.NAME)
        expect(response.body.user.id).toEqual(responseUser.body.id)
        expect(response.body.user.name).toEqual(responseUser.body.name)
        expect(response.body.user.name).toEqual(responseUser.body.name)
    })
})