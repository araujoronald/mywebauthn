import User from './User'
import * as uuid from 'uuid'

export default class Authenticator {
    credentialID: Uint8Array
    credentialPublicKey: Uint8Array
    counter: number
    credentialDeviceType: CredentialDeviceType
    credentialBackedUp: boolean
    transports: AuthenticatorTransport[]
    user: User

    private constructor(credentialID: Uint8Array, credentialPublicKey: Uint8Array, counter: number, credentialDeviceType: CredentialDeviceType, credentialBackedUp: boolean, transports: AuthenticatorTransport[], user: User) {
        this.credentialID = credentialID
        this.credentialPublicKey = credentialPublicKey
        this.counter = counter
        this.credentialDeviceType = credentialDeviceType
        this.credentialBackedUp = credentialBackedUp
        this.transports = transports
        this.user = user
    }

    static create(credentialPublicKey: Uint8Array, counter: number, credentialDeviceType: CredentialDeviceType, backedUp: boolean, transports: AuthenticatorTransport[], user: User) {
        return new Authenticator(new TextEncoder().encode(uuid.v4()), credentialPublicKey, counter, credentialDeviceType, backedUp, transports, user)
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