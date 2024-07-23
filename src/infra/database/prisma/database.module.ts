import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaQuestionsRepository } from "./repositories/prisma-questions-repository";
import { PrismaQuestionCommentsRepository } from "./repositories/prisma-question-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./repositories/prisma-answer-attachments-repository";
import { PrismaAnswerRepository } from "./repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./repositories/prisma-answer-comments-repository";
import { QuestionsRespository } from "@/domain/forum/application/repositories/questions-repository";

@Module({
  providers: [
    PrismaService, 
    {
      provide: QuestionsRespository,
      useClass: PrismaQuestionsRepository,
    }, 
    PrismaQuestionCommentsRepository, 
    PrismaAnswerAttachmentsRepository, 
    PrismaAnswerRepository, 
    PrismaAnswerCommentsRepository, 
    PrismaAnswerAttachmentsRepository
  ],
  exports: [
    PrismaService,
    QuestionsRespository, 
    PrismaQuestionCommentsRepository, 
    PrismaAnswerAttachmentsRepository, 
    PrismaAnswerRepository, 
    PrismaAnswerCommentsRepository, 
    PrismaAnswerAttachmentsRepository
  ],
})
export class DatabaseModule{}