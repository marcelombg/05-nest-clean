import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationsRepository } from 'test/repository/in-memory-notifications-repository'

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Create Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  test('it should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
