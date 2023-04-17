import { CougarBot } from '../../cougarbot/service/service';
import { GoogleCalendar } from '../../cougarbot/integrations/googleCalendar';

// jest.mock('../../cougarbot/integrations/googleCalendar'); // importing GoogleCalendar and mocking it

jest.mock('../../cougarbot/integrations/googleCalendar', () => {
    return {
        GoogleCalendar: jest.fn().mockImplementation(() => {
            return {
                getEvent: jest.fn().mockReturnValue({
                    summary: 'Basketball @ Nunawading Basketball Centre',
                    location: 'Nunawading Basketball Centre',
                    description: 'Court 1',
                }),
            };
        }),
    };
});

describe.only('cougarbot', () => {
    const cougarBot = new CougarBot();

    it('should return a string', async () => {
        const result = await cougarBot.getNextGame();
        expect(result).toBe(true);
    });

    it('should return the first player in the array that has availableToPlay set to 1', () => {
        const exampleProto = Object.getPrototypeOf(cougarBot);


        const players = [
            {
                playerId: 1,
                playerName: 'John',
                availableToPlay: 0,
            },
            {
                playerId: 2,
                playerName: 'Jane',
                availableToPlay: 1,
            },
            {
                playerId: 3,
                playerName: 'James',
                availableToPlay: 1,
            },
        ];

        const result = exampleProto.findAvailablePlayerName(players);

        expect(result).toBe('Jane');
    })

    it('should return undefined as no playres in the array have availableToPlay set to 1', () => {
        const exampleProto = Object.getPrototypeOf(cougarBot);


        const players = [
            {
                playerId: 1,
                playerName: 'John',
                availableToPlay: 0,
            },
            {
                playerId: 2,
                playerName: 'Jane',
                availableToPlay: 0,
            },
            {
                playerId: 3,
                playerName: 'James',
                availableToPlay: 0,
            },
        ];

        const result = exampleProto.findAvailablePlayerName(players);

        expect(result).toBe(undefined);
    })

    // unit test that runs the getNextGame function and checks that the correct values are returned
    it('should return a valid player name', async () => {
        // mock sqlite database
        

        const result = await cougarBot.getNextGame();
        expect(result).toBe();
    })
});
