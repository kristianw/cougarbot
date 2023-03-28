
export interface CalendarEvent {
    summary: string;
    location: string;
    description: string;
    startTime: string;
}

export interface BasketballGame {
    date: string;
    homeTeam: string;
    awayTeam: string;
    location: string;
    courtNumber: string;
    whoIsPaying: string;
}

export interface Player {
    playerId: string;
    playerName: string;
    availableToPlay: number;
}

export interface PaymentIndex {
    paymentIndex: number;
}