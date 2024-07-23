import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRespository } from "@/domain/forum/application/repositories/question-comments-respository";
import { QuestionComment } from "@/domain/forum/enterprise/entitites/question-comment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaQuestionCommentsRepository implements QuestionCommentsRespository {
    findById(id: string): Promise<QuestionComment | null> {
        throw new Error("Method not implemented.");
    }
    findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]> {
        throw new Error("Method not implemented.");
    }
    create(questionComment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(questionComment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
}