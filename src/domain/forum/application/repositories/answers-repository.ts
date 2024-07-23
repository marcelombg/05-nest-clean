import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entitites/answer'

export interface AnswersRespository {
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    parameters: PaginationParams,
  ): Promise<Answer[]>
  save(answer: Answer): Promise<void>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
