import Authenticator from '../../../domain/entities/Authenticator'
import User from '../../../domain/entities/User'
import AuthenticatorRepository from '../../../domain/repositories/AuthenticatorRepository'

export default class AuthenticatorRepositoryMemory implements AuthenticatorRepository {

    authenticators: Authenticator[] = []

    async find(id: string): Promise<Authenticator> {
        const found = this.authenticators.find((auth) => {
            return auth.id == id
        })
        return found!
    }

    async findAll(user: User): Promise<Authenticator[]> {
        const found = this.authenticators.filter((auth) => {
            return auth.user.id == user.id
        })
        return found
    }

    async save(authenticator: Authenticator): Promise<Authenticator> {
        this.authenticators.push(authenticator)
        return authenticator
    }

}