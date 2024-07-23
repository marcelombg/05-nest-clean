import { DomainEvents } from "@/core/events/domain-events"
import { StudentsRespository } from "@/domain/forum/application/repositories/students-repository"
import { Student } from "@/domain/forum/enterprise/entitites/student"

/* eslint-disable no-useless-constructor */

export class InMemoryStudentsRepository implements StudentsRespository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
