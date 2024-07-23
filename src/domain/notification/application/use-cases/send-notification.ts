import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotificationsRespository } from '../repositories/notifications-respository'

/* eslint-disable no-useless-constructor */

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseRequestResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRespository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseRequestResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
