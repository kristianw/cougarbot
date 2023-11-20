import axios from 'axios'

export class SignalService {
  private readonly endpoint: string
  private readonly number: string
  private readonly groupId: string

  constructor (endpoint: string, number: string, groupId: string) {
    this.number = number
    this.groupId = groupId
    this.endpoint = endpoint
  }

  sendMessageToGroup = async (message: string): Promise<string> => {
    const url = this.endpoint + '/v2/send'
    const data = {
      message,
      number: this.number,
      recipients: [this.groupId],
      textMode: 'styled'
    }

    try {
      const response = await axios.post(url, data)
      console.log('Message sent successfully:', response.data)
      return response.data
    } catch (error) {
      console.error('Error sending message:', error)
      return 'Error sending message'
    }
  }
}
