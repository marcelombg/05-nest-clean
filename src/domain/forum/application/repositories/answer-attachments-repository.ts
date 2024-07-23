import { AnswerAttachment } from '../../enterprise/entitites/answer-attachment'

export interface AnswerAttachmentsRespository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
