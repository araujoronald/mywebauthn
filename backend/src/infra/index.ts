import AuthenticatorRepositoryMemory from './repositories/AuthenticatorRepositoryMemory'
import UserRepositoryMemory from './repositories/UserRepositoryMemory'
import SimpleWebAuthnService from './services/SimpleWebAuthnService'
import GenerateRegistration from '../application/usecases/GenerateRegistration'
import GenerateRegistrationController from './controllers/GenerateRegistrationController'
import CreateUser from '../application/usecases/CreateUser'
import CreateUserController from './controllers/CreateUserController'
import VerifyRegistration from '../application/usecases/VerifyRegistration'
import VerifyRegistrationController from './controllers/VerifyRegistrationController'
import GenerateAuthentication from '../application/usecases/GenerateAuthentication'
import GenerateAuthenticationController from './controllers/GenerateAuthenticationController'
import VerifyAuthentication from '../application/usecases/VerifyAuthentication'
import VerifyAuthenticationController from './controllers/VerifyAuthenticationController'

const webAuthnService = new SimpleWebAuthnService()

const userRepository = new UserRepositoryMemory()
const authenticatorRepository = new AuthenticatorRepositoryMemory()

const generateRegistration = new GenerateRegistration(webAuthnService, userRepository, authenticatorRepository)
const verifyRegistration = new VerifyRegistration(webAuthnService, userRepository, authenticatorRepository)
const generateAuthentication = new GenerateAuthentication(webAuthnService, userRepository, authenticatorRepository)
const verifyAuthentication = new VerifyAuthentication(webAuthnService, userRepository, authenticatorRepository)
const createUser = new CreateUser(userRepository)

const generateRegistrationController = new GenerateRegistrationController()
const createUserController = new CreateUserController()
const verifyRegistrationController = new VerifyRegistrationController()
const generateAuthenticationController = new GenerateAuthenticationController()
const verifyAuthenticationController = new VerifyAuthenticationController()



export {
    generateRegistration,
    generateRegistrationController,
    generateAuthentication,
    generateAuthenticationController,
    createUser,
    createUserController,
    verifyRegistration,
    verifyRegistrationController,
    verifyAuthentication,
    verifyAuthenticationController
}