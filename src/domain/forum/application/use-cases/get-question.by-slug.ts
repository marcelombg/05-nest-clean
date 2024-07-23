import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entitites/question'
import { QuestionsRespository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

/* eslint-disable no-useless-constructor */

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRespository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
