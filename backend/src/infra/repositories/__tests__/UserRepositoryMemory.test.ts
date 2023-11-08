import { describe, it, expect, beforeEach } from 'vitest'
import User from '../../../domain/entities/User'
import UserRepository from '../../../domain/repositories/UserRepository'
import UserRepositoryMemory from '../UserRepositoryMemory'

describe('User Repository Memory', () => {

    let repository: UserRepository

    beforeEach(() => {
        repository = new UserRepositoryMemory()
    })

    it('must be save and find a new User', async () => {
        const user = User.create('Araujo')
        const savedUser = await repository.save(user)
        expect(repository).toBeDefined()
        expect(savedUser).toBeDefined()
        const found = await repository.find(savedUser!.id)
        expect(found).toBeDefined()
        expect(found?.id).toBeDefined()
        expect(found?.id).toEqual(savedUser?.id)
        expect(found?.name).toEqual(savedUser?.name)
        expect(found?.challenge).toEqual(savedUser?.challenge)
    })

    it('must be find and update a User name', async () => {
        const user = User.create('Carvalho')
        const savedUser = await repository.save(user)
        const found = await repository.find(savedUser!.id)
        found!.name = 'Ribeiro'
        const updatedUser = await repository.update(found!)
        expect(updatedUser).toBeDefined()
        expect(updatedUser?.id).toEqual(found?.id)
        expect(updatedUser?.name).toEqual(found?.name)
        expect(updatedUser?.challenge).toEqual(found?.challenge)
    })

    it('must be update a not exists User', () => {
        const user = User.create('Carvalho')
        expect(async () => await repository.update(user)).rejects.toThrow('User not found')
    })

})