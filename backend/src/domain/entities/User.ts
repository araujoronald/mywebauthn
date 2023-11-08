import * as uuid from 'uuid'

export default class User {
    id: string
    name: string
    challenge: string

    private constructor(id: string, name: string, challenge: string) {
        this.id = id
        this.name = name
        this.challenge = challenge
    }

    static create(name: string) {
        if (!name.trim()) {
            throw new Error('name must have 3 or more characters')
        }
        return new User(uuid.v4(), name, User.generateChallenge())
    }

    static load(id: string, name: string, challenge: string) {
        return new User(id, name, challenge)
    }

    newChallenge() {
        this.challenge = User.generateChallenge()
    }

    private static generateChallenge() {
        return uuid.v4()
    }
}