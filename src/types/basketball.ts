export interface CalendarEvent {
  summary: string;
  location: string;
  description: string;
  startTime: string;
}

export interface GameSummary {
  gameType: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  courtNumber: string;
}

export interface BasketballGame {
  round: string;
  date: string;
  gameTime: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  courtNumber: string;
  whoIsPaying: string;
}

133464;

export interface Player {
  // playerId: string;
  playerName: string;
  availableToPlay: boolean;
}

export interface PaymentIndex {
  paymentIndex: number;
}
