import { CalendarEvent, BasketballGame } from './../../types/basketball';
import { GoogleCalendar } from './../integrations/googleCalendar';


class CougarBot {
    public async getNextGame(): Promise<boolean> {
        const googleCalendar = new GoogleCalendar();
        const upcomingEvent: CalendarEvent = await googleCalendar.getEvent();

        // Determine who is paying for the game
        

        const upcomingGame: BasketballGame = {
            date: '',
            homeTeam: '',
            awayTeam: '',
            location: '',
            courtNumber: '',
            whoIsPaying: ''
        }

        // Send game to Signal Messenger

        return true
    }

    async determineWhoIsPaying(): Promise<string> {
        // get list of players
        
        // get player paying index from database

        // check if player is available
            // check signal chat for outs

        // if player is available, return player name

        // update player paying index in database
    }
}
