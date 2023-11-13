import { Request, Response } from 'express'
import { generateAuthentication } from '..'

export default class GenerateAuthenticationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.params.uid
        try {
            const result = await generateAuthentication.execute(userId)
            return response.status(200).type('application/json').json(result)

        } catch (error) {
            console.error(error)
            return response
                .status(500)
                .json({ message: 'Fail during the execution. Try again' })
        }
    }
}