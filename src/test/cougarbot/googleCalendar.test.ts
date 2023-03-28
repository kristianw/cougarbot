import { GoogleCalendar } from './../../cougarbot/integrations/googleCalendar';

describe('googleCalendar', () => {

  const googleCalendar = new GoogleCalendar();

  test('should return a string', async () => {
    const result = await googleCalendar.getEvent();
     expect(result).toBe('string');
  });
});