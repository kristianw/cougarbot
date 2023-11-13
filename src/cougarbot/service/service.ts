import { GoogleCalendar } from "../integrations/googleCalendar";
import {
  CalendarEvent,
  Player,
  GameSummary,
  BasketballGame,
} from "../../types/basketball";
import { PlayHqService } from "../../playhq-service/playhq";
import { getNextDayOfWeek } from "../utils";
import { findPlayers } from "../db/queries/playerRepository";
import { getNextGame } from "../db/queries/gameRepository";
import { getPaymentIndex, updatePayment } from "../db/queries/paymentRepository";
import { Game } from "../db/interfaces";

export class CougarBot {
  private playhq: PlayHqService;

  constructor() {
    this.playhq = new PlayHqService();
  }

  public async getNextGame(): Promise<Game> {
    // const googleCalendar = new GoogleCalendar();
    // const upcomingEvent = await googleCalendar.getEvent();

    // const gameSummary: GameSummary =
    //   CougarBot.extractGameSummary(upcomingEvent);

    // Determine when the next wednesday is
    const nextWednesday = getNextDayOfWeek(new Date, 3);

    // Get the next game from Postgres
    const upcomingGame = await getNextGame(nextWednesday);

    // Determine who is paying for the game
    upcomingGame.whoIsPaying = parseInt(await this.determineWhoIsPaying());

    console.log(`game: ${JSON.stringify(upcomingGame)}`);

    return upcomingGame;
  }

  private sortArrayWithIntegerAtTop(
    players: Player[],
    integer: number
  ): Player[] {
    // Find the player with the specified integer
    const player = players.find((p) => p.availableToPlay === true);
    if (!player) {
      // If the integer isn't found, return the original array
      return players;
    }

    // Remove the player from the array
    const remainingPlayers = players.filter((p) => p !== player);

    // Sort the remaining players by availableToPlay attribute
    remainingPlayers.sort(
      (a: Player, b: Player): number => Number(b.availableToPlay) - Number(a.availableToPlay)
    );

    // Add the player at the beginning of the array
    remainingPlayers.unshift(player);

    return remainingPlayers;
  }

  private findAvailablePlayerName(players: Player[]): string | undefined {
    if (players.length === 0) {
      // If there are no more players left in the array, return undefined
      return undefined;
    }

    const [currentPlayer, ...remainingPlayers] = players;
    if (currentPlayer.availableToPlay) {
      // If the current player is available to play, return their name
      return currentPlayer.playerName;
    }

    // Otherwise, continue to search through the remaining players recursively
    return this.findAvailablePlayerName(remainingPlayers);
  }

  async determineWhoIsPaying(): Promise<string> {
    // get list of players
    const players = await this.getPlayers();

    // get player paying index from database
    const paymentIndex = await this.getStoredPaymentIndex();

    // determine who is paying for the game and ensure they are available to play
    const sortedPlayers = this.sortArrayWithIntegerAtTop(players, paymentIndex);
    const availablePlayerName = this.findAvailablePlayerName(sortedPlayers);

    // TODO: check signal chat for outs

    if (availablePlayerName) {
      // Check if the newPaymentIndex is greater than the number of players
      const newPaymentIndex = CougarBot.determineNextPayingPlayer(
        paymentIndex,
        players.length
      );

      // If a player is available to play, update the payment index
      await updatePayment(newPaymentIndex, 
        { paymentIndex: 1 },
      );
    }

    return availablePlayerName
      ? availablePlayerName
      : "No players found that are set to available";
  }

  private async getPlayers(): Promise<Player[]> {
    return await findPlayers();
  }

  async getStoredPaymentIndex(): Promise<number> {
    return (await getPaymentIndex()).paymentIndex;
  }

  private static determineNextPayingPlayer(
    paymentIndex: number,
    numberOfPlayers: number
  ): number {
    return paymentIndex + 1 > numberOfPlayers ? 1 : paymentIndex + 1;
  }

  private static extractGameSummary(upcomingEvent: CalendarEvent): GameSummary {
    const gameSummaryArray = upcomingEvent.summary.split(",");
    return {
      gameType: gameSummaryArray[0],
      homeTeam: gameSummaryArray[1],
      awayTeam: gameSummaryArray[2],
      location: gameSummaryArray[3],
      courtNumber: gameSummaryArray[4],
    };
  }
}
