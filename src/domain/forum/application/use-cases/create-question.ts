import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entitites/question'
import { QuestionsRespository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entitites/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entitites/question-attachment-list'
import { Injectable } from '@nestjs/common'

/* eslint-disable no-useless-constructor */

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseRequestResponse = Either<
  null,
  {
    question: Question
  }
>

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRespository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseRequestResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}
