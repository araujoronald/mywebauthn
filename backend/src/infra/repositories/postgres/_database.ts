import pgPromise from 'pg-promise'

const pgp = pgPromise()
const dbPostgres = pgp({
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? '1234',
    host: process.env.POSTGRES_DB ?? 'postgresdb',
    port: 5432,
    database: 'mywebauthn'
})

export {
    dbPostgres
}