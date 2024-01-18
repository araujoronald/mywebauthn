import * as uuid from 'uuid'
import { Request, Response } from 'express'
import { generateAuthentication } from '..'

export default class GenerateAuthenticationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const sid = uuid.v4()
        const userId = request.params.uid
        const email = request.params.email
        try {
            const result = await generateAuthentication.execute(userId, email, sid)
            return response.status(200).type('application/json').json(result)

        } catch (error) {
            console.error(error)
            return response
                .status(500)
                .json({ message: 'Fail during the execution. Try again' })
        }
    }
}