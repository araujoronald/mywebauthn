import express, { json } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { helloRoutes } from './infra/api/hello.routes'
import { registrationRoutes } from './infra/api/registration.routes'
import { userRoutes } from './infra/api/user.routes'
import dotenv from 'dotenv'
import { authenticationRoutes } from './infra/api/authentication.routes'
dotenv.config()

const app = express()
app.use(cors())
app.use(json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helloRoutes)
app.use(userRoutes)
app.use(registrationRoutes)
app.use(authenticationRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`>>>> Serviço iniciado na porta ${port}`)
})

export {
    app
}
