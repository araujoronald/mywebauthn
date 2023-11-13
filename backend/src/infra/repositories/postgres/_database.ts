import pgPromise from 'pg-promise'

const pgp = pgPromise()
const dbPostgres = pgp({
    user: 'postgres',
    password: '1234',
    host: 'postgresdb',
    port: 5432,
    database: 'mywebauthn'
})

export {
    dbPostgres
}