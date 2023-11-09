import { Router } from 'express'
import { generateRegistrationController, verifyRegistrationController } from '..'

const router = Router()

router.get('/registration/:uid', (request, response) => {
    generateRegistrationController.handle(request, response)
})

router.post('/registration/verify/:uid', (request, response) => {
    verifyRegistrationController.handle(request, response)
})

export { router as registrationRoutes }