import User from '../../../domain/entities/User'
import UserRepository from '../../../domain/repositories/UserRepository'
import { dbPostgres } from './_database'


export default class UserRepositoryPostgres implements UserRepository {

    users: User[] = []

    async find(id: string): Promise<User> {
        const found = await dbPostgres.one('SELECT * FROM users u WHERE u.id=$1', [id])
        console.log('found', found)

        let user = null
        if (found) {
            user = User.load(
                found.id,
                found.name,
                found.challenge
            )
        }
        return user!
    }

    async save(user: User): Promise<User> {
        await dbPostgres.none('INSERT INTO users VALUES ($1, $2, $3)', [
            user.id,
            user.name,
            user.challenge
        ])
        return user
    }

    async update(user: User): Promise<User> {
        await dbPostgres.none('UPDATE users SET name=$1, challenge=$2 WHERE id=$3', [
            user.name,
            user.challenge,
            user.id
        ])
        return user
    }

}