import axios from "axios";
import { BasketballGame } from "../types/basketball";
import { PlayHqResponse, DiscoverTeamFixture } from "../types/playhq";

export class PlayHqService {
  public async retrieveTeamFixture(): Promise<BasketballGame[]> {
    const playHqFixture = await this.getTeamFixture();
    const upcomingGames = this.storeUpcomingGames(playHqFixture);
    return upcomingGames;
  }
  async getTeamFixture(): Promise<PlayHqResponse> {
    const endpoint = "https://api.playhq.com/graphql";
    const someHeaders = {
      authority: "api.playhq.com",
      pragma: "no-cache",
      "cache-control": "no-cache",
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      accept: "*/*",
      dnt: "1",
      "sec-ch-ua-mobile": "?0",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "content-type": "application/json",
      origin: "https://www.playhq.com",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      "accept-language": "en-AU,en-US;q=0.9,en-GB;q=0.8,en;q=0.7",
      tenant: "basketball-victoria",
    };

    const graphqlQuery = {
      query: `query teamFixture($teamID: ID!) {\r\n  discoverTeamFixture(teamID: $teamID) {\r\n    id\r\n    name\r\n    provisionalDate\r\n    grade {\r\n      id\r\n      name\r\n      season {\r\n        id\r\n        name\r\n        competition {\r\n          id\r\n          name\r\n          organisation {\r\n            id\r\n            name\r\n            __typename\r\n          }\r\n          __typename\r\n        }\r\n        __typename\r\n      }\r\n      __typename\r\n    }\r\n    fixture {\r\n      ...RoundFixtureFragment\r\n      __typename\r\n    }\r\n    __typename\r\n  }\r\n}\r\n\r\nfragment RoundFixtureFragment on DiscoverRoundFixture {\r\n  byes {\r\n    ...DiscoverTeamFragment\r\n    __typename\r\n  }\r\n  games {\r\n    id\r\n    alias\r\n    pool {\r\n      id\r\n      name\r\n      __typename\r\n    }\r\n    away {\r\n      ...TeamFragment\r\n      __typename\r\n    }\r\n    home {\r\n      ...TeamFragment\r\n      __typename\r\n    }\r\n    result {\r\n      winner {\r\n        name\r\n        value\r\n        __typename\r\n      }\r\n      outcome {\r\n        name\r\n        __typename\r\n      }\r\n      home {\r\n        score\r\n        outcome {\r\n          name\r\n          value\r\n          __typename\r\n        }\r\n        statistics {\r\n          count\r\n          type {\r\n            value\r\n            __typename\r\n          }\r\n          __typename\r\n        }\r\n        __typename\r\n      }\r\n      away {\r\n        score\r\n        outcome {\r\n          name\r\n          value\r\n          __typename\r\n        }\r\n        statistics {\r\n          count\r\n          type {\r\n            value\r\n            __typename\r\n          }\r\n          __typename\r\n        }\r\n        __typename\r\n      }\r\n      __typename\r\n    }\r\n    status {\r\n      name\r\n      value\r\n      __typename\r\n    }\r\n    date\r\n    allocation {\r\n      time\r\n      court {\r\n        id\r\n        name\r\n        abbreviatedName\r\n        latitude\r\n        longitude\r\n        venue {\r\n          id\r\n          name\r\n          abbreviatedName\r\n          latitude\r\n          longitude\r\n          address\r\n          suburb\r\n          state\r\n          postcode\r\n          country\r\n          __typename\r\n        }\r\n        __typename\r\n      }\r\n      __typename\r\n    }\r\n    isStale\r\n    __typename\r\n  }\r\n  __typename\r\n}\r\n\r\nfragment TeamFragment on DiscoverPossibleTeam {\r\n  ... on ProvisionalTeam {\r\n    name\r\n    pool {\r\n      id\r\n      name\r\n      __typename\r\n    }\r\n    __typename\r\n  }\r\n  ... on DiscoverTeam {\r\n    ...DiscoverTeamFragment\r\n    __typename\r\n  }\r\n  __typename\r\n}\r\n\r\nfragment DiscoverTeamFragment on DiscoverTeam {\r\n  id\r\n  name\r\n  logo {\r\n    sizes {\r\n      url\r\n      dimensions {\r\n        width\r\n        height\r\n        __typename\r\n      }\r\n      __typename\r\n    }\r\n    __typename\r\n  }\r\n  season {\r\n    id\r\n    name\r\n    competition {\r\n      id\r\n      name\r\n      __typename\r\n    }\r\n    __typename\r\n  }\r\n  organisation {\r\n    id\r\n    name\r\n    type\r\n    __typename\r\n  }\r\n  __typename\r\n}\r\n`,
      variables: {
        teamID: "c857ec16",
      },
    };

    try {
      const response = await axios({
        url: endpoint,
        method: "post",
        headers: someHeaders,
        data: graphqlQuery,
      });

      // console.log(`data: ${JSON.stringify(response.data)}`);

      return response as PlayHqResponse;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to get team fixture from PlayHQ");
    }
  }

  storeUpcomingGames = (playHqFixture: PlayHqResponse): BasketballGame[] => {
    const games = playHqFixture.data.discoverTeamFixture;

    const upcomingGames: BasketballGame[] = [];

    games.forEach((element: DiscoverTeamFixture) => {
      if (element.fixture.games.length > 0) {
        const upcomingGame: BasketballGame = {
          round: element.name,
          date: element.fixture.games[0].allocation?.time,
          gameTime: element.fixture.games[0].allocation.time,
          homeTeam: element.fixture.games[0].home.name,
          awayTeam: element.fixture.games[0].away.name,
          location: element.fixture.games[0].allocation.court.venue.name,
          courtNumber: element.fixture.games[0].allocation.court.name,
          whoIsPaying: "TBC",
        };

        upcomingGames.push(upcomingGame);
        console.info(
          `upcomingGame: ${JSON.stringify(upcomingGame, null, 2)}\n`
        );
      }
      if (element.fixture.byes.length > 0) {
        console.log(`  Bye: ${element.fixture.byes[0].name}`);
        const upcomingBye: BasketballGame = {
          round: element.name,
          date: element.provisionalDate,
          gameTime: "",
          homeTeam: "Cougars",
          awayTeam: "Bye",
          location: "",
          courtNumber: "",
          whoIsPaying: "",
        };
        upcomingGames.push(upcomingBye);
        console.info(`upcomingBye: ${JSON.stringify(upcomingBye, null, 2)}\n`);
      }
    });
    return upcomingGames;
  };
}
