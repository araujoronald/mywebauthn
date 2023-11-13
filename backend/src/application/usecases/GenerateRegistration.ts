import RelyingParty from '../../domain/entities/RelyingParty'
import AuthenticatorRepository from '../../domain/repositories/AuthenticatorRepository'
import UserRepository from '../../domain/repositories/UserRepository'
import WebAuthnService from '../../domain/services/WebAuthnService'

export default class GenerateRegistration {

    webAuthnService: WebAuthnService
    userRepository: UserRepository
    authenticatorRepository: AuthenticatorRepository

    constructor(webAuthnService: WebAuthnService, userRepository: UserRepository, authenticatorRepository: AuthenticatorRepository) {
        this.webAuthnService = webAuthnService
        this.userRepository = userRepository
        this.authenticatorRepository = authenticatorRepository
    }

    async execute(userId: string) {
        const user = await this.userRepository.find(userId)
        const userAuthenticators = await this.authenticatorRepository.findAll(user)
        const registrationOptions = await this.webAuthnService.generateRegistrationOptions(RelyingParty.ID, RelyingParty.NAME, user, userAuthenticators)
        user.challenge = registrationOptions.challenge
        await this.userRepository.update(user)
        return registrationOptions
    }
}