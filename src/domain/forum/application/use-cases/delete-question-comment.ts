import { Either, left, right } from '@/core/either'
import { QuestionCommentsRespository } from '../repositories/question-comments-respository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'

/* eslint-disable no-useless-constructor */

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseRequestResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRespository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseRequestResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
