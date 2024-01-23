import UserRepository from '../../domain/repositories/UserRepository'

export default class ListUser {

    userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: string) {
        return await this.userRepository.findByEmail(email)

    }
}