import { Request, Response } from 'express'
import { verifyAuthentication } from '..'

export default class VerifyAuthenticationController {

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

        let sessionId = request.header('session-id')
        if (!sessionId) {
            sessionId = request.sessionID
        }

        try {
            const result = await verifyAuthentication.execute(userId, body, origin, sessionId)
            return response.status(200).type('application/json').json(result)

        } catch (error) {
            console.error(error)
            return response
                .status(500)
                .json({ message: 'Fail during the execution. Try again' })
        }
    }
}