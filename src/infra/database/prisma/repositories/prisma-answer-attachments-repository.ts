import { AnswerAttachmentsRespository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entitites/answer-attachment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswerAttachmentsRepository implements AnswerAttachmentsRespository {
    findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
        throw new Error("Method not implemented.");
    }
    deleteManyByAnswerId(answerId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}