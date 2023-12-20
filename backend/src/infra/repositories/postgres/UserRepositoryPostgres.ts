import User from '../../../domain/entities/User'
import UserRepository from '../../../domain/repositories/UserRepository'
import { dbPostgres } from './_database'


export default class UserRepositoryPostgres implements UserRepository {

    users: User[] = []

    async find(id: string): Promise<User> {
        const found = await dbPostgres.oneOrNone('SELECT * FROM users u WHERE u.id=$1', [id])

        let user = null
        if (found) {
            user = User.load(
                found.id,
                found.email,
                found.challenge
            )
        }
        return user!
    }

    async findByEmail(email: string): Promise<User> {
        const found = await dbPostgres.oneOrNone('SELECT * FROM users u WHERE u.email=$1', [email])

        let user = null
        if (found) {
            user = User.load(
                found.id,
                found.email,
                found.challenge
            )
        }
        return user!
    }

    async save(user: User): Promise<User> {
        await dbPostgres.none('INSERT INTO users VALUES ($1, $2, $3)', [
            user.id,
            user.email.value,
            user.challenge
        ])
        return user
    }

    async update(user: User): Promise<User> {
        await dbPostgres.none('UPDATE users SET email=$1, challenge=$2 WHERE id=$3', [
            user.email.value,
            user.challenge,
            user.id
        ])
        return user
    }

}