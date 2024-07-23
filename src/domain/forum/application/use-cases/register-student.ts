import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entitites/student'
import { StudentsRespository } from '../repositories/students-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'

/* eslint-disable no-useless-constructor */

interface RegisterStudentUseCaseRequest {
    name: string
    email: string
    password: string
}

type RegisterStudentUseCaseRequestResponse = Either<
    StudentAlreadyExistsError,
    {
        student: Student
    }
>

@Injectable()
export class RegisterStudentUseCase {
    constructor(
        private studentsRepository: StudentsRespository,
        private hashGenerator: HashGenerator
    ) { }

    async execute({
        name, 
        email,
        password,
    }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseRequestResponse> {

        const studentWithSameEmail = await this.studentsRepository.findByEmail(email)
      
          if (studentWithSameEmail) {
            return left(new StudentAlreadyExistsError(email))
          }
      
          const hashedPassword = await this.hashGenerator.hash(password)
      
          const student = Student.create({
            name,
            email,
            password: hashedPassword,
          })

          await this.studentsRepository.create(student)
      

        return right({
            student,
        })
    }
}
