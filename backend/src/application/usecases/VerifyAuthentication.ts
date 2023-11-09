import RelyingParty from '../../domain/entities/RelyingParty'
import AuthenticatorRepository from '../../domain/repositories/AuthenticatorRepository'
import UserRepository from '../../domain/repositories/UserRepository'
import WebAuthnService from '../../domain/services/WebAuthnService'

export default class VerifyAuthentication {

    webAuthnService: WebAuthnService
    userRepository: UserRepository
    authenticatorRepository: AuthenticatorRepository

    constructor(webAuthnService: WebAuthnService, userRepository: UserRepository, authenticatorRepository: AuthenticatorRepository) {
        this.webAuthnService = webAuthnService
        this.userRepository = userRepository
        this.authenticatorRepository = authenticatorRepository
    }

    async execute(userId: string, body: any, origin: string) {
        const user = await this.userRepository.find(userId)
        const authenticator = await this.authenticatorRepository.find(body.id)
        const verification = await this.webAuthnService.verifyAuthenticationResponse(RelyingParty.ID, user.challenge, body, origin, authenticator)
        const authenticationInfo = verification.authenticationInfo
        authenticator.counter = authenticationInfo.newCounter
        await this.authenticatorRepository.save(authenticator)
    }
}