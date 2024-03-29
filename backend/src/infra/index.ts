// import AuthenticatorRepositoryMemory from './repositories/memory/AuthenticatorRepositoryMemory'
// import UserRepositoryMemory from './repositories/memory/UserRepositoryMemory'
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
import AuthenticatorRepositoryPostgres from './repositories/postgres/AuthenticatorRepositoryPostgres'
import UserRepositoryPostgres from './repositories/postgres/UserRepositoryPostgres'
import ChallengeRepositoryMemory from './repositories/memory/ChallengeRepositoryMemory'
import ListUser from '../application/usecases/ListUser'
import ListUserController from './controllers/ListUserController'

const webAuthnService = new SimpleWebAuthnService()

// const userRepository = new UserRepositoryMemory()
// const authenticatorRepository = new AuthenticatorRepositoryMemory()
const userRepository = new UserRepositoryPostgres()
const authenticatorRepository = new AuthenticatorRepositoryPostgres()
const challengeRepository = new ChallengeRepositoryMemory()

const generateRegistration = new GenerateRegistration(webAuthnService, userRepository, authenticatorRepository)
const verifyRegistration = new VerifyRegistration(webAuthnService, userRepository, authenticatorRepository)
const generateAuthentication = new GenerateAuthentication(webAuthnService, userRepository, authenticatorRepository, challengeRepository)
const verifyAuthentication = new VerifyAuthentication(webAuthnService, userRepository, authenticatorRepository, challengeRepository)
const createUser = new CreateUser(userRepository)
const listUser = new ListUser(userRepository)

const generateRegistrationController = new GenerateRegistrationController()
const createUserController = new CreateUserController()
const listUserController = new ListUserController()
const verifyRegistrationController = new VerifyRegistrationController()
const generateAuthenticationController = new GenerateAuthenticationController()
const verifyAuthenticationController = new VerifyAuthenticationController()



export {
    generateRegistration,
    generateRegistrationController,
    generateAuthentication,
    generateAuthenticationController,
    createUser,
    listUser,
    createUserController,
    listUserController,
    verifyRegistration,
    verifyRegistrationController,
    verifyAuthentication,
    verifyAuthenticationController
}