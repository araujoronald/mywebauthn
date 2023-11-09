import { Request, Response } from 'express'
import { verifyRegistration } from '..'

export default class VerifyRegistrationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.params.uid
        if (!userId) {
            return response
                .status(422)
                .json({ property: 'uid', message: 'uid param is required' })
        }

        const body = request.body
        if (!body) {
            return response
                .status(422)
                .json({ property: 'body', message: 'body is required' })
        }

        const origin = request.headers['origin']
        if (!origin) {
            return response
                .status(422)
                .json({ property: 'origin', message: 'header origin is required' })
        }

        try {
            const result = await verifyRegistration.execute(userId, body, origin)
            return response.status(200).type('application/json').json(result)

        } catch (error) {
            console.error(error)
            return response
                .status(500)
                .json({ message: 'Fail during the execution. Try again' })
        }
    }
}