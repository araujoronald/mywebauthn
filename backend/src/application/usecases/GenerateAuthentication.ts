import RelyingParty from '../../domain/entities/RelyingParty'
import AuthenticatorRepository from '../../domain/repositories/AuthenticatorRepository'
import ChallengeRepository from '../../domain/repositories/ChallengeRepository'
import UserRepository from '../../domain/repositories/UserRepository'
import WebAuthnService from '../../domain/services/WebAuthnService'

export default class GenerateAuthentication {

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

    async execute(userId: string, email: string, sessionId: string) {

        let user
        if (userId) {
            user = await this.userRepository.find(userId)
        } else if (email) {
            user = await this.userRepository.findByEmail(email)
        }

        if (!user) {
            if (email) {
                throw new Error('Usuário não identificado')
            }
            const authenticationOptions = await this.webAuthnService.generateAuthenticationOptions(RelyingParty.ID, [])
            const challenge = authenticationOptions.challenge
            await this.challengeRepository.save(sessionId, challenge)
            authenticationOptions.sid = sessionId
            return authenticationOptions
        }

        const userAuthenticators = await this.authenticatorRepository.findAll(user)
        const authenticationOptions = await this.webAuthnService.generateAuthenticationOptions(RelyingParty.ID, userAuthenticators)
        user.challenge = authenticationOptions.challenge
        await this.userRepository.update(user)
        return authenticationOptions
    }
}