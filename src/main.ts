import { SignalService } from './signal/signal.service'
import { CougarBot } from './cougarbot/service/service'
import { config } from './config/local.config'

export const getNextGameAndSendToTeam = async (): Promise<void> => {
  try {
    const cougarBot = new CougarBot()
    const signalService = new SignalService(
      config.signalEndpoint,
      config.signalSourceNumber,
      config.signalGroupId
    )
    const nextGame = await cougarBot.getNextGame()
    const gameMessage = cougarBot.createGameMessage(nextGame)
    const result = await signalService.sendMessageToGroup(gameMessage)
    console.log(`Sending Message - ${JSON.stringify(result)}`)
    console.log(gameMessage)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.error(`Unable to get next game and send message - ${error}`)
  }
}

void getNextGameAndSendToTeam()
