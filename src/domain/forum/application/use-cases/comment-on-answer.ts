import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entitites/answer-comment'
import { AnswersRespository } from '../repositories/answers-repository'
import { AnswerCommentsRespository } from '../repositories/answer-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

/* eslint-disable no-useless-constructor */

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseRequestResponse = Either<
  ResourceNotFoundError,
  { answerComment: AnswerComment }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRespository,
    private answerCommentsRepository: AnswerCommentsRespository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseRequestResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
