import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entitites/question-comment'
import { QuestionCommentsRespository } from '../repositories/question-comments-respository'

/* eslint-disable no-useless-constructor */

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseRequestResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRespository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseRequestResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
