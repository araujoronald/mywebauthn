import { Request, Response } from 'express'
import { createUser } from '..'

export default class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const userName = request.body.name
        if (!userName) {
            return response
                .status(422)
                .json({ property: 'userName', message: 'userName is required' })
        }
        try {
            const result = await createUser.execute(userName)
            return response.status(200).type('application/json').json({
                id: result.id,
                name: result.email.value
            })

        } catch (error) {
            console.error(error)
            return response
                .status(500)
                .json({ message: 'Fail during the execution. Try again' })
        }
    }
}