export default class Email {

    private email: string

    private constructor(email: string) {
        this.email = email
    }

    static create(email: string): Email {
        // TODO - Yes. This is a newbie impl
        const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        if (!emailRegex.test(email)) {
            throw new Error('Invalid e-mail')
        }
        return new Email(email)
    }

    get value(): string {
        return this.email
    }
}