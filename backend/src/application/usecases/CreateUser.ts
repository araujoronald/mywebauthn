import User from '../../domain/entities/User'
import UserRepository from '../../domain/repositories/UserRepository'

export default class CreateUser {

    userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(userName: string) {
        const user = User.create(userName)
        const savedUser = await this.userRepository.save(user)
        return savedUser
    }
}