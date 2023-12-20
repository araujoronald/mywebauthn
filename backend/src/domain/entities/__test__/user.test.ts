import { describe, expect, it } from 'vitest'
import User from '../User'

describe('User unit test', () => {

    it('Must create a valid user', () => {
        const userEmail = 'ronald.ecomp@gmail.com'
        const user = User.create(userEmail)
        expect(user).toBeDefined()
        expect(user.id).toBeDefined()
        expect(user.challenge).toBeDefined()
        expect(user.email.value).toEqual(userEmail)
    })

    it('Must throw exception for invalid email', () => {
        const userEmail = 'ronald'
        expect(() => User.create(userEmail)).toThrow('Invalid e-mail')
    })
})