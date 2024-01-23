import { Router } from 'express'
import { createUserController, listUserController } from '..'

const router = Router()

router.post('/user', (request, response) => {
    createUserController.handle(request, response)
})

router.get('/user/:email', (request, response) => {
    listUserController.handle(request, response)
})

export { router as userRoutes }