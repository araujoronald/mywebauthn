
export default interface ChallengeRepository {
    find(sessionId: string): Promise<string>
    save(sessionId: string, challenge: string): Promise<void>
}