import { describe, it, expect, beforeEach } from 'vitest'
import User from '../../../domain/entities/User'
import AuthenticatorRepository from '../../../domain/repositories/AuthenticatorRepository'
import AuthenticatorRepositoryMemory from '../memory/AuthenticatorRepositoryMemory'
import Authenticator, { AuthenticatorTransport, CredentialDeviceType } from '../../../domain/entities/Authenticator'
import * as uuid from 'uuid'


describe('AuthCredential Repository Memory', () => {

    let repository: AuthenticatorRepository
    let textEncoder: TextEncoder

    beforeEach(() => {
        repository = new AuthenticatorRepositoryMemory()
        textEncoder = new TextEncoder()
    })

    it('must be save and find a new AuthCredential', async () => {
        const user = User.create('ronald.ecomp@gmail.com')
        const authenticator = Authenticator.create(textEncoder.encode(uuid.v4()), textEncoder.encode('pk'), 1, CredentialDeviceType.SINGLE_DEVICE, false, [AuthenticatorTransport.USB], user)
        const savedAuthenticator = await repository.save(authenticator)
        expect(repository).toBeDefined()
        expect(savedAuthenticator).toBeDefined()
        const found = await repository.find(Buffer.from(savedAuthenticator!.credentialID).toString('base64url'))
        expect(found).toBeDefined()
        expect(found?.credentialID).toBeDefined()
        expect(found?.credentialID).toEqual(savedAuthenticator?.credentialID)
        expect(found?.credentialPublicKey).toEqual(savedAuthenticator?.credentialPublicKey)
        expect(found?.counter).toEqual(savedAuthenticator?.counter)
        expect(found?.credentialDeviceType).toEqual(savedAuthenticator?.credentialDeviceType)
        expect(found?.credentialBackedUp).toEqual(savedAuthenticator?.credentialBackedUp)
        expect(found?.transports).toEqual(savedAuthenticator?.transports)
        expect(found?.user.id).toEqual(savedAuthenticator?.user.id)
    })

    it('must be find all AuthCredential of the User', async () => {
        const user = User.create('ronald@gmail.com')
        const authenticatorsToSave = [
            Authenticator.create(textEncoder.encode(uuid.v4()), textEncoder.encode('pk'), 1, CredentialDeviceType.SINGLE_DEVICE, false, [AuthenticatorTransport.BLUETOOTH], user),
            Authenticator.create(textEncoder.encode(uuid.v4()), textEncoder.encode('pk2'), 2, CredentialDeviceType.MULTI_DEVICE, true, [AuthenticatorTransport.USB], user),
            Authenticator.create(textEncoder.encode(uuid.v4()), textEncoder.encode('pk3'), 3, CredentialDeviceType.SINGLE_DEVICE, true, [AuthenticatorTransport.NFC], user)
        ]
        for (const auth of authenticatorsToSave) {
            await repository.save(auth)
        }

        const foundAuthenticator = await repository.findAll(user)
        expect(foundAuthenticator).toBeDefined()
        expect(foundAuthenticator.length).toEqual(authenticatorsToSave.length)
    })

})