import { describe, expect, it } from 'vitest'
import SimpleWebAuthnService from '../SimpleWebAuthnService'
import RelyingParty from '../../../domain/entities/RelyingParty'
import User from '../../../domain/entities/User'

describe('SimpleWebAuthn service', () => {

    it('Must generate a registration options', async () => {
        const webAuthnService = new SimpleWebAuthnService()
        const user = User.create('ronald.ecomp@gmail.com')
        const registrationOptions = await webAuthnService.generateRegistrationOptions(RelyingParty.ID, RelyingParty.NAME, user, [])
        // then - assert
        expect(registrationOptions).toBeDefined()
        expect(registrationOptions.rp.id).toEqual(RelyingParty.ID)
        expect(registrationOptions.rp.name).toEqual(RelyingParty.NAME)
        expect(registrationOptions.user.id).toEqual(user.id)
        expect(registrationOptions.user.name).toEqual(user.email.value)
        expect(registrationOptions.user.displayName).toEqual(user.email.value)
    })
})