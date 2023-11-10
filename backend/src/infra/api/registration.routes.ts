import { Router } from 'express'
import { generateRegistrationController, verifyRegistrationController } from '..'

const router = Router()

router.get('/registration/:uid', (request, response) => {
    return generateRegistrationController.handle(request, response)
})

router.post('/registration/verify/:uid', (request, response) => {
    return verifyRegistrationController.handle(request, response)
})

export { router as registrationRoutes }