import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entitites/answer-comment'
import { AnswerCommentsRespository } from '../repositories/answer-comments-repository'

/* eslint-disable no-useless-constructor */

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseRequestResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRespository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseRequestResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return right({
      answerComments,
    })
  }
}
