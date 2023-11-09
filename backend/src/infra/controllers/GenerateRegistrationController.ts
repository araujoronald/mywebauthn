import { Request, Response } from 'express'
import { generateRegistration } from '..'

export default class GenerateRegistrationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.params.uid
        if (!userId) {
            return response
                .status(422)
                .json({ property: 'uid', message: 'uid param is required' })
        }
        try {
            const result = await generateRegistration.execute(userId)
            return response.status(200).type('application/json').json(result)

        } catch (error) {
            console.error(error)
            return response
                .status(500)
                .json({ message: 'Fail during the execution. Try again' })
        }
    }
}