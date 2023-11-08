import dotenv from 'dotenv'
dotenv.config()

export default class RelyingParty {
    static readonly ID = process.env.RP_ID || ''
    static readonly NAME = process.env.RP_NAME || ''
}