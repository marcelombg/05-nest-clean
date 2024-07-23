import { QuestionAttachmentsRespository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entitites/question-attachment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaQuestioAttachmentsRepository implements QuestionAttachmentsRespository {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
        throw new Error("Method not implemented.");
    }
    deleteManyByQuestionId(questionId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}