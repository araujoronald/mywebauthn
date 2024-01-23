import { Request, Response } from 'express'
import { listUser } from '..'

export default class ListUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const email = request.params.email
        if (!email) {
            return response
                .status(422)
                .json({ property: 'email', message: 'email is required' })
        }
        try {
            const result = await listUser.execute(email)

            return response.status(200).type('application/json').json({
                id: result.id,
                email: result.email.value
            })

        } catch (error) {
            console.error(error)
            return response
                .status(500)
                .json({ message: 'Fail during the execution. Try again' })
        }
    }
}