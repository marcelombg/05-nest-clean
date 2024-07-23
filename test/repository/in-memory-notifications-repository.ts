import { NotificationsRespository } from '@/domain/notification/application/repositories/notifications-respository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRespository
{
  public items: Notification[] = []

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }
}
