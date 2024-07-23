import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repository/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(inMemoryStudentsRepository, fakeHasher, fakeEncrypter)
  })

  test('should be able to authenticate a new student', async () => {
    const student = makeStudent({
        email: 'john.doe@example.com',
        password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
        accessToken: expect.any(String)
    })
  })
})
