import Authenticator from '../../../domain/entities/Authenticator'
import User from '../../../domain/entities/User'
import AuthenticatorRepository from '../../../domain/repositories/AuthenticatorRepository'
import { dbPostgres } from './_database'

export default class AuthenticatorRepositoryPostgres implements AuthenticatorRepository {

    authenticators: Authenticator[] = []

    async find(id: string): Promise<Authenticator> {
        const found = await dbPostgres.one('SELECT * FROM authenticators a INNER JOIN users u ON u.id = a.user_id WHERE a.id=$1', [id])
        let authenticator = null

        if (found) {
            authenticator = Authenticator.load(
                found.id,
                found.credential_id,
                found.credential_public_key,
                found.counter,
                found.credential_device_type,
                found.credential_backed_up,
                found.transports,
                User.load(found.user_id, found.name, found.challenge)
            )
        }
        return authenticator!
    }

    async findAll(user: User): Promise<Authenticator[]> {
        const found = await dbPostgres.any('SELECT * FROM authenticators a WHERE a.user_id=$1', [user.id])

        const authenticators = []
        if (found) {
            for (const auth of found) {
                const authenticator = Authenticator.load(
                    auth.id,
                    auth.credential_id,
                    auth.credential_public_key,
                    auth.counter,
                    auth.credential_device_type,
                    auth.credential_backed_up,
                    [],
                    user
                )
                authenticators.push(authenticator)
            }
        }
        return authenticators!
    }

    async save(authenticator: Authenticator): Promise<Authenticator> {
        await dbPostgres.none('INSERT INTO authenticators VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
            authenticator.id,
            Buffer.from(authenticator.credentialID),
            Buffer.from(authenticator.credentialPublicKey),
            authenticator.counter,
            authenticator.credentialDeviceType,
            authenticator.credentialBackedUp,
            authenticator.transports,
            authenticator.user.id,
        ])
        return authenticator
    }

}