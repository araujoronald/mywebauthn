import RelyingParty from '../../domain/entities/RelyingParty'
import AuthenticatorRepository from '../../domain/repositories/AuthenticatorRepository'
import ChallengeRepository from '../../domain/repositories/ChallengeRepository'
import UserRepository from '../../domain/repositories/UserRepository'
import WebAuthnService from '../../domain/services/WebAuthnService'

export default class VerifyAuthentication {

    webAuthnService: WebAuthnService
    userRepository: UserRepository
    authenticatorRepository: AuthenticatorRepository
    challengeRepository: ChallengeRepository

    constructor(webAuthnService: WebAuthnService, userRepository: UserRepository, authenticatorRepository: AuthenticatorRepository, challengeRepository: ChallengeRepository) {
        this.webAuthnService = webAuthnService
        this.userRepository = userRepository
        this.authenticatorRepository = authenticatorRepository
        this.challengeRepository = challengeRepository
    }

    async execute(userId: string, body: any, origin: string, sessionId: string) {
        const user = await this.userRepository.find(userId)
        const authenticator = await this.authenticatorRepository.find(body.id)

        let challenge = await this.challengeRepository.find(sessionId)

        if (!challenge) {
            challenge = user.challenge
        }

        const verification = await this.webAuthnService.verifyAuthenticationResponse(RelyingParty.ID, challenge, body, origin, authenticator)

        const authenticationInfo = verification.authenticationInfo
        authenticator.counter = authenticationInfo.newCounter
        await this.authenticatorRepository.save(authenticator)
        verification.user = {
            'id': user.id,
            'displayName': user.email.value
        }
        return verification
    }
}