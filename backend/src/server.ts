import express, { json } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { helloRoutes } from './infra/api/hello.routes'

const app = express()
app.use(cors())
app.use(json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(helloRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`>>>> Serviço iniciado na porta ${port}`)
})
