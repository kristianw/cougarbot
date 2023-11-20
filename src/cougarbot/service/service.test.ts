import { CougarBot } from "./service";

describe('CougarBot_class', () => {

    // Tests that the getNextGame method of the CougarBot class returns true
    it('test_getNextGameReturnsTrue', async () => {
        const cougarBot = new CougarBot();
        const result = await cougarBot.getNextGame();
        expect(result).toBe(true);
    });


    // Tests that sortArrayWithIntegerAtTop sorts players correctly
    it('test_sortArrayWithIntegerAtTop', () => {
        const cougarBot = new CougarBot();
        const players = [
            {
                playerId: '1',
                playerName: 'John',
                availableToPlay: false,
            },
            {
                playerId: '2',
                playerName: 'Jane',
                availableToPlay: true,
            },
            {
                playerId: '3',
                playerName: 'James',
                availableToPlay: true,
            },
        ];
        const sortedPlayers = cougarBot['sortArrayWithIntegerAtTop'](players, 1);
        expect(sortedPlayers[0].playerName).toBe('Jane');
        expect(sortedPlayers[1].playerName).toBe('James');
        expect(sortedPlayers[2].playerName).toBe('John');
    });
});
