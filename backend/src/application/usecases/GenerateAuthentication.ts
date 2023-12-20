import RelyingParty from '../../domain/entities/RelyingParty'
import AuthenticatorRepository from '../../domain/repositories/AuthenticatorRepository'
import UserRepository from '../../domain/repositories/UserRepository'
import WebAuthnService from '../../domain/services/WebAuthnService'

export default class GenerateAuthentication {

    webAuthnService: WebAuthnService
    userRepository: UserRepository
    authenticatorRepository: AuthenticatorRepository

    constructor(webAuthnService: WebAuthnService, userRepository: UserRepository, authenticatorRepository: AuthenticatorRepository) {
        this.webAuthnService = webAuthnService
        this.userRepository = userRepository
        this.authenticatorRepository = authenticatorRepository
    }

    async execute(userId: string, email: string) {

        let user
        if (userId) {
            user = await this.userRepository.find(userId)
        } else if (email) {
            user = await this.userRepository.findByEmail(email)
        }

        if (!user) {
            return await this.webAuthnService.generateAuthenticationOptions(RelyingParty.ID, [])
        }

        const userAuthenticators = await this.authenticatorRepository.findAll(user)
        const authenticationOptions = await this.webAuthnService.generateAuthenticationOptions(RelyingParty.ID, userAuthenticators)
        user.challenge = authenticationOptions.challenge
        await this.userRepository.update(user)
        return authenticationOptions
    }
}