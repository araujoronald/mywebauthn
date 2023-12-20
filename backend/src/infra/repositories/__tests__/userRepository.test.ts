import { describe, it, expect, beforeEach } from 'vitest'
import User from '../../../domain/entities/User'
import UserRepository from '../../../domain/repositories/UserRepository'
import UserRepositoryMemory from '../memory/UserRepositoryMemory'
import Email from '../../../domain/vo/Email'


describe('User Repository', () => {

    let repository: UserRepository

    beforeEach(() => {
        repository = new UserRepositoryMemory()
    })

    it('must be save and find a new User', async () => {
        const user = User.create('ronald.ecomp@gmail.com')
        const savedUser = await repository.save(user)
        expect(repository).toBeDefined()
        expect(savedUser).toBeDefined()
        const found = await repository.find(savedUser!.id)
        expect(found).toBeDefined()
        expect(found?.id).toBeDefined()
        expect(found?.id).toEqual(savedUser?.id)
        expect(found?.email.value).toEqual(savedUser?.email.value)
        expect(found?.challenge).toEqual(savedUser?.challenge)
    })

    it('must be find and update a User email', async () => {
        const user = User.create('ronald.ecomp@gmail.com')
        const savedUser = await repository.save(user)
        const found = await repository.find(savedUser!.id)
        found!.email = Email.create('ronald.ecomp2@gmail.com')
        const updatedUser = await repository.update(found!)
        expect(updatedUser).toBeDefined()
        expect(updatedUser?.id).toEqual(found?.id)
        expect(updatedUser?.email.value).toEqual(found?.email.value)
        expect(updatedUser?.challenge).toEqual(found?.challenge)
    })

    it('must be update a not exists User', () => {
        const user = User.create('ronald@gmail.com')
        expect(async () => await repository.update(user)).rejects.toThrow('User not found')
    })

})