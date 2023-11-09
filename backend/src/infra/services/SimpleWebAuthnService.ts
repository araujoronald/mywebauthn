import { generateAuthenticationOptions, generateRegistrationOptions, verifyAuthenticationResponse, verifyRegistrationResponse } from '@simplewebauthn/server'
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

    async verifyRegistrationResponse(relyingPartyId: string, challenge: string, body: any, origin: string) {
        try {
            const verification = await verifyRegistrationResponse({
                response: body,
                expectedChallenge: challenge,
                expectedOrigin: origin,
                expectedRPID: relyingPartyId,
            })
            return verification

        } catch (error) {
            throw new Error(`Verify Registration error: ${error}`)
        }
    }

    async generateAuthenticationOptions(relyingPartyId: string, userAuthenticators: Authenticator[]) {
        const authenticationOptions = await generateAuthenticationOptions({
            rpID: relyingPartyId,
            allowCredentials: userAuthenticators.map(authenticator => ({
                id: authenticator.credentialID,
                type: 'public-key',
                transports: authenticator.transports,
            })),
            userVerification: 'preferred',
        })
        return authenticationOptions
    }

    async verifyAuthenticationResponse(relyingPartyId: string, challenge: string, body: any, origin: string, authenticator: Authenticator) {
        try {
            const verification = await verifyAuthenticationResponse({
                response: body,
                expectedChallenge: challenge,
                expectedOrigin: origin,
                expectedRPID: relyingPartyId,
                authenticator
            })
            return verification

        } catch (error) {
            throw new Error(`Verify Authentication error: ${error}`)
        }
    }
}