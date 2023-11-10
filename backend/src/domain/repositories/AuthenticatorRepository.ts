import Authenticator from '../entities/Authenticator'
import User from '../entities/User'

export default interface AuthenticatorRepository {
    find(id: string): Promise<Authenticator>
    findAll(user: User): Promise<Authenticator[]>
    save(authCredential: Authenticator): Promise<Authenticator>
}