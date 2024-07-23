import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entitites/student'
import { StudentsRespository } from '../repositories/students-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

/* eslint-disable no-useless-constructor */

interface AuthenticateStudentUseCaseRequest {
    email: string
    password: string
}

type AuthenticateStudentUseCaseRequestResponse = Either<
    WrongCredentialsError,
    {
        accessToken: string
    }
>

@Injectable()
export class AuthenticateStudentUseCase {
    constructor(
        private studentsRepository: StudentsRespository,
        private hashComparer: HashComparer,
        private encrypter: Encrypter
    ) { }

    async execute({
        email,
        password,
    }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseRequestResponse> {

        const student = await this.studentsRepository.findByEmail(email)
      
          if (!student) {
            return left(new WrongCredentialsError())
          }

          const isPasswordValid = await this.hashComparer.compare(password, student.password)

          if (!isPasswordValid) {
            return left(new WrongCredentialsError())
          }
      
          const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })     

        return right({
            accessToken,
        })
    }
}
