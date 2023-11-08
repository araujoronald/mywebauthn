import { generateRegistrationOptions } from '@simplewebauthn/server'
import WebAuthnService from '../../domain/services/WebAuthnService'
import Authenticator from '../../domain/entities/Authenticator'
import User from '../../domain/entities/User'

export default class SimpleWebAuthnService implements WebAuthnService {

    async generateRegistrationOptions(relyingPartyId: string, relyingPartyName: string, user: User, authenticators: Authenticator[]) {
        const registrationOptions = await generateRegistrationOptions({
            rpID: relyingPartyId,
            rpName: relyingPartyName,
            userID: user.id,
            userName: user.name,
            userDisplayName: user.name,
            attestationType: 'none',
            excludeCredentials: authenticators.map(authenticator => ({
                id: authenticator.credentialID,
                type: 'public-key',
                transports: authenticator.transports,
            })),
            authenticatorSelection: {
                residentKey: 'preferred',
                userVerification: 'preferred',
                authenticatorAttachment: 'platform',
            }
        })
        return registrationOptions
    }
}