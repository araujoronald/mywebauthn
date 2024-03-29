import { Router } from 'express'
import { generateAuthenticationController, verifyAuthenticationController } from '..'

const router = Router()

router.get('/authentication', (request, response) => {
    return generateAuthenticationController.handle(request, response)
})

router.get('/authentication/:uid', (request, response) => {
    return generateAuthenticationController.handle(request, response)
})

router.get('/authentication/email/:email', (request, response) => {
    return generateAuthenticationController.handle(request, response)
})

router.post('/authentication/verify/:uid', (request, response) => {
    return verifyAuthenticationController.handle(request, response)
})

export { router as authenticationRoutes }