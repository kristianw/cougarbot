import { GoogleCalendar } from '../integrations/googleCalendar';
import { CalendarEvent, BasketballGame, Player, GameSummary } from '../../types/basketball';
import { Database } from '../db/sqlite3';

export class CougarBot {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public async getNextGame(): Promise<boolean> {
        const googleCalendar = new GoogleCalendar();
        const upcomingEvent = await googleCalendar.getEvent();

        const gameSummary: GameSummary = CougarBot.extractGameSummary(upcomingEvent);

        // Determine who is paying for the game
        const whoIsPaying = await this.determineWhoIsPaying();

        const upcomingGame: BasketballGame = {
            date: upcomingEvent.startTime,
            homeTeam: gameSummary.homeTeam,
            awayTeam: gameSummary.awayTeam,
            location: gameSummary.location,
            courtNumber: gameSummary.courtNumber,
            whoIsPaying: whoIsPaying
        };

        // Send game to Signal Messenger

        // Close database connection
        this.db.close();

        console.log(`game: ${JSON.stringify(upcomingGame)}`);

        return true
    }

    private sortArrayWithIntegerAtTop(players: Player[], integer: number): Player[] {
        // Find the player with the specified integer
        const player = players.find(p => p.availableToPlay === integer);
        if (!player) {
            // If the integer isn't found, return the original array
            return players;
        }

        // Remove the player from the array
        const remainingPlayers = players.filter(p => p !== player);

        // Sort the remaining players by availableToPlay attribute
        remainingPlayers.sort(
            (a: Player, b: Player): number => b.availableToPlay - a.availableToPlay
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
        if (currentPlayer.availableToPlay === 1) {
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
            const newPaymentIndex = CougarBot.determineNextPayingPlayer(paymentIndex, players.length);

            // If a player is available to play, update the payment index
            await this.db.query(`UPDATE Payment SET playerIndex = ${newPaymentIndex}`, {});
        }

        return availablePlayerName ? availablePlayerName : 'No players found that are set to available';
    }

    private async getPlayers(): Promise<Player[]> {
        const players = await this.db.query(`SELECT * FROM Players`, {});
        return players ? players.map((player: Player) => ({ playerName: player.playerName, availableToPlay: player.availableToPlay })) : 'No players found';
    }

    async getStoredPaymentIndex(): Promise<number | any> {
        const row = await this.db.query(`SELECT playerIndex FROM Payment`, {});

        return row ? row[0].playerIndex : 'No payment index found';
    }

    private static determineNextPayingPlayer(paymentIndex: number, numberOfPlayers: number): number {
        return (paymentIndex + 1) > numberOfPlayers ? 1 : paymentIndex + 1;
    }

    private static extractGameSummary(upcomingEvent: CalendarEvent): GameSummary {
        const gameSummaryArray = upcomingEvent.summary.split(',');
        return {
            gameType: gameSummaryArray[0],
            homeTeam: gameSummaryArray[1],
            awayTeam: gameSummaryArray[2],
            location: gameSummaryArray[3],
            courtNumber: gameSummaryArray[4],
        };
    }

}
