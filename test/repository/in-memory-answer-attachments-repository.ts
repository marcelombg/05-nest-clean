import { AnswerAttachmentsRespository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entitites/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRespository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachments
  }
}
