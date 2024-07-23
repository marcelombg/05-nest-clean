import { Student } from '../../enterprise/entitites/student'

export abstract class StudentsRespository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}