import express, { json } from 'express'
import * as uuid from 'uuid'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
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
app.use(cookieParser())
app.use(session({
    name: 'SessionCookie',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    genid: function (req) {
        console.log('session id created')
        return uuid.v4()
    },
    secret: process.env.SESSION_SECRET || 'b6382edbbedbdff2ee6042e995bb6da4cddba100972d46b0fd06166480cbda99',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 300000
    }
}))
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
