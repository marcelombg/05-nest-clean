import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entitites/question'

export abstract class QuestionsRespository {
  abstract findById(id: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract save(question: Question): Promise<void>
  abstract create(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
}
