import { QuestionAttachment } from '../../enterprise/entitites/question-attachment'

export interface QuestionAttachmentsRespository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
