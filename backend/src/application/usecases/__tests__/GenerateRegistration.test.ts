import { describe, expect, it } from 'vitest'
import SimpleWebAuthnService from '../../../infra/services/SimpleWebAuthnService'
import AuthenticatorRepositoryMemory from '../../../infra/repositories/memory/AuthenticatorRepositoryMemory'
import User from '../../../domain/entities/User'
import GenerateRegistration from '../GenerateRegistration'
import UserRepositoryMemory from '../../../infra/repositories/memory/UserRepositoryMemory'

describe('WebAuthn Generate Registration', () => {

    it('Must generate a registration options', async () => {
        const webAuthnService = new SimpleWebAuthnService()
        const userRepository = new UserRepositoryMemory()
        const authenticatorRepository = new AuthenticatorRepositoryMemory()

        const savedUser = await userRepository.save(User.create('ronald.ecomp@gmail.com'))
        const generateRegistration = new GenerateRegistration(webAuthnService, userRepository, authenticatorRepository)
        const output = await generateRegistration.execute(savedUser.id)

        expect(output).toBeDefined()
        expect(output.user.id).toEqual(savedUser.id)
        expect(output.user.name).toEqual(savedUser.email.value)
        expect(output.user.displayName).toEqual(savedUser.email.value)
    })
})