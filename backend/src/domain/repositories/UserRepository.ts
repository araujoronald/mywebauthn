import User from '../entities/User'

export default interface UserRepository {
    find(id: string): Promise<User>
    save(user: User): Promise<User>
    update(user: User): Promise<User>
}