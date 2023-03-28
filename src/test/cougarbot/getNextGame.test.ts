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
    const bot = new CougarBot();

    test.only('should return a string', async () => {
        const result = await bot.getNextGame();
        expect(result).toBe(true);
    });
});
