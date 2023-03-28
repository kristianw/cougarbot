import { GoogleCalendar } from '../integrations/googleCalendar';
import { CalendarEvent, BasketballGame } from '../../types/basketball';
import { Database } from '../db/sqlite3';


export class CougarBot {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    public async getNextGame(): Promise<boolean> {
        const googleCalendar = new GoogleCalendar();
        const upcomingEvent = await googleCalendar.getEvent();


        // Determine who is paying for the game
        const whoIsPaying = await this.determineWhoIsPaying();

        const upcomingGame: BasketballGame = {
            date: upcomingEvent.startTime,
            homeTeam: '',
            awayTeam: '',
            location: '',
            courtNumber: '',
            whoIsPaying: whoIsPaying
        }

        // Send game to Signal Messenger

        // Close database connection
        this.db.close();

        console.log(`game: ${JSON.stringify(upcomingGame)}`);

        return true
    }

    async determineWhoIsPaying(): Promise<string> {
        // get list of players
        // write sql query to get list of players
        const players = await this.db.getPlayers();

        // get player paying index from database
        const payerIndex = await this.db.getPaymentIndex();

        // check if player is available
        // if (players[payerIndex].available) {
        //     return players[payerIndex].name;
        // }
        // check signal chat for outs

        // if player is available, return player name

        // update player paying index in database
        return players ? players[payerIndex].playerName : 'No players found';
    }
}
