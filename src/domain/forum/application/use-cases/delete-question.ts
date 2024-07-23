import { Either, left, right } from '@/core/either'
import { QuestionsRespository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'

/* eslint-disable no-useless-constructor */

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseRequestResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRespository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseRequestResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}
