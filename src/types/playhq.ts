export interface PlayHqResponse {
  data: PlayHqTeamFixture;
}

export interface PlayHqTeamFixture {
  discoverTeamFixture: DiscoverTeamFixture[];
}

export interface DiscoverTeamFixture {
  id: string;
  name: string;
  provisionalDate: string;
  grade: Grade;
  fixture: Fixture;
  __typename: string;
}

export interface Grade {
  id: string;
  name: string;
  season: Season;
  __typename: string;
}

export interface Season {
  id: string;
  name: string;
  competition: Competition;
  __typename: string;
}

export interface Competition {
  id: string;
  name: string;
  organisation: Organisation;
  __typename: string;
}

export interface Organisation {
  id: string;
  name: string;
  __typename: string;
}

export interface Fixture {
  byes: Bye[];
  games: Game[];
  __typename: string;
}

export interface Bye {
  id: string;
  name: string;
  logo: Logo;
  season: Season2;
  organisation: Organisation2;
  __typename: string;
}

export interface Logo {
  sizes: Size[];
  __typename: string;
}

export interface Size {
  url: string;
  dimensions: Dimensions;
  __typename: string;
}

export interface Dimensions {
  width: number;
  height: number;
  __typename: string;
}

export interface Season2 {
  id: string;
  name: string;
  competition: Competition2;
  __typename: string;
}

export interface Competition2 {
  id: string;
  name: string;
  __typename: string;
}

export interface Organisation2 {
  id: string;
  name: string;
  type: string;
  __typename: string;
}

export interface Game {
  id: string;
  alias: any;
  pool: any;
  away: Away;
  home: Home;
  result?: Result | null;
  status: Status;
  date: string;
  allocation: Allocation;
  isStale: boolean;
  __typename: string;
}

export interface Away {
  id: string;
  name: string;
  logo: Logo2;
  season: Season3;
  organisation: Organisation3;
  __typename: string;
}

export interface Logo2 {
  sizes: Size2[];
  __typename: string;
}

export interface Size2 {
  url: string;
  dimensions: Dimensions2;
  __typename: string;
}

export interface Dimensions2 {
  width: number;
  height: number;
  __typename: string;
}

export interface Season3 {
  id: string;
  name: string;
  competition: Competition3;
  __typename: string;
}

export interface Competition3 {
  id: string;
  name: string;
  __typename: string;
}

export interface Organisation3 {
  id: string;
  name: string;
  type: string;
  __typename: string;
}

export interface Home {
  id: string;
  name: string;
  logo: Logo3;
  season: Season4;
  organisation: Organisation4;
  __typename: string;
}

export interface Logo3 {
  sizes: Size3[];
  __typename: string;
}

export interface Size3 {
  url: string;
  dimensions: Dimensions3;
  __typename: string;
}

export interface Dimensions3 {
  width: number;
  height: number;
  __typename: string;
}

export interface Season4 {
  id: string;
  name: string;
  competition: Competition4;
  __typename: string;
}

export interface Competition4 {
  id: string;
  name: string;
  __typename: string;
}

export interface Organisation4 {
  id: string;
  name: string;
  type: string;
  __typename: string;
}

export interface Result {
  winner: Winner;
  outcome: Outcome;
  home: Home2;
  away: Away2;
  __typename: string;
}

export interface Winner {
  name: string;
  value: string;
  __typename: string;
}

export interface Outcome {
  name: string;
  __typename: string;
}

export interface Home2 {
  score: number;
  outcome: Outcome2;
  statistics: Statistic[];
  __typename: string;
}

export interface Outcome2 {
  name: string;
  value: string;
  __typename: string;
}

export interface Statistic {
  count: number;
  type: Type;
  __typename: string;
}

export interface Type {
  value: string;
  __typename: string;
}

export interface Away2 {
  score: number;
  outcome: Outcome3;
  statistics: Statistic2[];
  __typename: string;
}

export interface Outcome3 {
  name: string;
  value: string;
  __typename: string;
}

export interface Statistic2 {
  count: number;
  type: Type2;
  __typename: string;
}

export interface Type2 {
  value: string;
  __typename: string;
}

export interface Status {
  name: string;
  value: string;
  __typename: string;
}

export interface Allocation {
  time: string;
  court: Court;
  __typename: string;
}

export interface Court {
  id: string;
  name: string;
  abbreviatedName: string;
  latitude: any;
  longitude: any;
  venue: Venue;
  __typename: string;
}

export interface Venue {
  id: string;
  name: string;
  abbreviatedName: string;
  latitude: string;
  longitude: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
  __typename: string;
}
