import User from './User'

export default class Authenticator {
    id: string
    credentialID: Uint8Array
    credentialPublicKey: Uint8Array
    counter: number
    credentialDeviceType: CredentialDeviceType
    credentialBackedUp: boolean
    transports: AuthenticatorTransport[]
    user: User

    private constructor(id: string, credentialID: Uint8Array, credentialPublicKey: Uint8Array, counter: number, credentialDeviceType: CredentialDeviceType, credentialBackedUp: boolean, transports: AuthenticatorTransport[], user: User) {
        this.id = id
        this.credentialID = credentialID
        this.credentialPublicKey = credentialPublicKey
        this.counter = counter
        this.credentialDeviceType = credentialDeviceType
        this.credentialBackedUp = credentialBackedUp
        this.transports = transports
        this.user = user
    }

    static create(credentialId: Uint8Array, credentialPublicKey: Uint8Array, counter: number, credentialDeviceType: CredentialDeviceType, backedUp: boolean, transports: AuthenticatorTransport[], user: User) {
        return new Authenticator(Buffer.from(credentialId).toString('base64url'), credentialId, credentialPublicKey, counter, credentialDeviceType, backedUp, transports, user)
    }

    static load(id: string, credentialId: Uint8Array, credentialPublicKey: Uint8Array, counter: number, credentialDeviceType: CredentialDeviceType, backedUp: boolean, transports: AuthenticatorTransport[], user: User) {
        return new Authenticator(id, credentialId, credentialPublicKey, counter, credentialDeviceType, backedUp, transports, user)
    }
}

export enum CredentialDeviceType {
    SINGLE_DEVICE = 'singleDevice',
    MULTI_DEVICE = 'multiDevice'
}

export enum AuthenticatorTransport {
    USB = 'usb',
    BLUETOOTH = 'ble',
    NFC = 'nfc',
    INTERNAL = 'internal'
}