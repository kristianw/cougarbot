import { GoogleCalendar } from './../../cougarbot/integrations/googleCalendar';

describe('googleCalendar', () => {

  const googleCalendar = new GoogleCalendar();

  test('should return a string', async () => {
    const result = await googleCalendar.getEvent();
     expect(result).toContain('summary')
     expect(result).toContain('location')
     expect(result).toContain('description')
     expect(result).toContain('startTime')

    });
});