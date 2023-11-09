import Authenticator from '../entities/Authenticator'
import User from '../entities/User'

export default interface WebAuthnService {

    generateRegistrationOptions(relyingPartyId: string, relyingPartyName: string, user: User, authenticators: Authenticator[]): Promise<any>
    verifyRegistrationResponse(relyingPartyId: string, challenge: string, body: any, origin: string): Promise<any>
    generateAuthenticationOptions(relyingPartyId: string, userAuthenticators: Authenticator[]): Promise<any>
    verifyAuthenticationResponse(relyingPartyId: string, challenge: string, body: any, origin: string, authenticator: Authenticator): Promise<any>
}