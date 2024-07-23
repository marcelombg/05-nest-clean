import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entitites/answer'
import { AnswersRespository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { AnswerAttachmentList } from '../../enterprise/entitites/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entitites/answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentsRespository } from '../repositories/answer-attachments-repository'

/* eslint-disable no-useless-constructor */

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseRequestResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRespository,
    private answerAttachmentsRepository: AnswerAttachmentsRespository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseRequestResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList

    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
