import AuthenticatorRepositoryMemory from './repositories/AuthenticatorRepositoryMemory'
import UserRepositoryMemory from './repositories/UserRepositoryMemory'
import SimpleWebAuthnService from './services/SimpleWebAuthnService'
import GenerateRegistration from '../application/usecases/GenerateRegistration'
import GenerateRegistrationController from './controllers/GenerateRegistrationController'
import CreateUser from '../application/usecases/CreateUser'
import CreateUserController from './controllers/CreateUserController'

const webAuthnService = new SimpleWebAuthnService()

const userRepository = new UserRepositoryMemory()
const authenticatorRepository = new AuthenticatorRepositoryMemory()

const generateRegistration = new GenerateRegistration(webAuthnService, userRepository, authenticatorRepository)
const createUser = new CreateUser(userRepository)

const generateRegistrationController = new GenerateRegistrationController()
const createUserController = new CreateUserController()

export {
    generateRegistration,
    generateRegistrationController,
    createUser,
    createUserController
}