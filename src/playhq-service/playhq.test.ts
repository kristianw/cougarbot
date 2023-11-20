import axios from "axios";
import { PlayHqService } from "./playhq";
import { sampleFixture } from "./sample-data";

describe("PlayHQ Service", () => {
  const playHqService = new PlayHqService();
  describe("getGameData", () => {
    // Tests that the function sends a POST request to the correct endpoint
  });

  describe("storeUpcomingGames", () => {
    // Tests that storeUpcomingGames function returns an array of BasketballGame objects
    it("test_returns_array_of_basketball_game_objects", () => {
      const basketballGames = playHqService.storeUpcomingGames(sampleFixture);
      expect(basketballGames).toBeInstanceOf(Array);
    });

    // Tests that the function 'storeUpcomingGames' correctly maps the properties of the BasketballGame object from the data
    it("test_correctly_maps_basketball_game_object_properties", () => {
      const basketballGames = playHqService.storeUpcomingGames(sampleFixture);
      const basketballGame = basketballGames[0];
      expect(basketballGame).toEqual({
        awayTeam: "Cougars (WED)",
        courtNumber: "Court 2",
        date: "19:15:00",
        gameTime: "19:15:00",
        homeTeam: "Blackburn YCW",
        location: "Mullauna College",
        round: "Round 1",
        whoIsPaying: "TBC",
      });
    });
  });
});
