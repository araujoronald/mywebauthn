import User from '../../domain/entities/User'
import UserRepository from '../../domain/repositories/UserRepository'

export default class UserRepositoryMemory implements UserRepository {

    users: User[] = []

    async find(id: string): Promise<User> {
        const found = this.users.find((user) => {
            return user.id == id
        })
        return found!
    }

    async save(user: User): Promise<User> {
        this.users.push(user)
        return user
    }

    async update(user: User): Promise<User> {
        const idx = this.users.findIndex(u => {
            return u.id = user.id
        })

        if (this.users.length < 1 && idx == -1) {
            throw new Error('User not found')
        }

        this.users[idx] = user
        return this.users[idx]
    }

}