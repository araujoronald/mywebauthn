import { Router } from 'express'
import { generateRegistrationController } from '..'

const router = Router()

router.get('/registration/:uid', (request, response) => {
    generateRegistrationController.handle(request, response)
})

export { router as registrationRoutes }