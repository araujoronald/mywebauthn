import Authenticator from '../../domain/entities/Authenticator'
import RelyingParty from '../../domain/entities/RelyingParty'
import AuthenticatorRepository from '../../domain/repositories/AuthenticatorRepository'
import UserRepository from '../../domain/repositories/UserRepository'
import WebAuthnService from '../../domain/services/WebAuthnService'

export default class VerifyRegistration {

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
        console.log('user', user)

        const verification = await this.webAuthnService.verifyRegistrationResponse(RelyingParty.ID, user.challenge, body, origin)
        console.log('verification', verification)
        const registrationInfo = verification.registrationInfo
        const authenticator = Authenticator.create(
            registrationInfo.credentialID,
            registrationInfo.credentialPublicKey,
            registrationInfo.counter,
            registrationInfo.credentialDeviceType,
            registrationInfo.credentialBackedUp,
            registrationInfo.transports,
            user
        )

        console.log('Salvando a autenticação no DB')
        await this.authenticatorRepository.save(authenticator)
        console.log('Autenticação salva')
        return verification
    }
}