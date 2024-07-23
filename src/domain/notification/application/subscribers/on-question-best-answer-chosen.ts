import { EventHandler } from '@/core/events/event-handler'
import { DomainEvents } from '@/core/events/domain-events'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { AnswersRespository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionBesteEventChosenEvent } from '@/domain/forum/enterprise/events/question-best-event-chosen-event'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRespository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBesteEventChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBesteEventChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida`,
        content: `A resposta que você envicou em "${question.title.substring(0, 20).concat('...')}" foi escolhida pelo autor!`,
      })
    }
  }
}
