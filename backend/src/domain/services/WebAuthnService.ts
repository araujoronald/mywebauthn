import Authenticator from '../entities/Authenticator'
import User from '../entities/User'

export default interface WebAuthnService {

    generateRegistrationOptions(relyingPartyId: string, relyingPartyName: string, user: User, authenticators: Authenticator[]): any
}