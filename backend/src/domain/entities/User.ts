import * as uuid from 'uuid'
import Email from '../vo/Email'

export default class User {
    id: string
    email: Email
    challenge: string

    private constructor(id: string, email: Email, challenge: string) {
        this.id = id
        this.email = email
        this.challenge = challenge
    }

    static create(email: string) {
        if (!email.trim()) {
            throw new Error('name must have 3 or more characters')
        }
        return new User(uuid.v4(), Email.create(email), User.generateChallenge())
    }

    static load(id: string, email: string, challenge: string) {
        return new User(id, Email.create(email), challenge)
    }

    newChallenge() {
        this.challenge = User.generateChallenge()
    }

    private static generateChallenge() {
        return uuid.v4()
    }
}