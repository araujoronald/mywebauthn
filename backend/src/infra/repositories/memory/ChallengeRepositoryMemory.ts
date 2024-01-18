import ChallengeRepository from '../../../domain/repositories/ChallengeRepository'

export default class ChallengeRepositoryMemory implements ChallengeRepository {

    challenges: Challenge[] = []

    async find(sessionId: string): Promise<string> {
        const found = this.challenges.find((challenge) => {
            return challenge.sessionId == sessionId
        })
        if (!found) {
            return ''
        }
        return found.challenge
    }

    async save(sessionId: string, challenge: string): Promise<void> {
        this.challenges.push(new Challenge(sessionId, challenge))
    }

}

export class Challenge {
    sessionId: string
    challenge: string

    constructor(sessionId: string, challenge: string) {
        this.sessionId = sessionId
        this.challenge = challenge
    }
}