import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
    player: PlayerTable
    payment: PaymentTable
    game: GameTable
}

export interface PlayerTable {
    id: Generated<number>
    playerName: string
    availableToPlay: boolean
    createdAt: ColumnType<Date>
    updatedAt: ColumnType<Date>
}

export type Player = Selectable<PlayerTable>
export type NewPlayer = Insertable<Omit<PlayerTable, 'id' | 'createdAt' | 'updatedAt'>>
export type PlayerUpdate = Updateable<Omit<PlayerTable, 'id' | 'createdAt' | 'updatedAt'>>

export interface PaymentTable {
    id: Generated<number>
    paymentIndex: number
    createdAt: ColumnType<Date>
    updatedAt: ColumnType<Date>
}

export type Payment = Selectable<PaymentTable>
export type NewPayment = Insertable<Omit<PaymentTable, 'id' | 'createdAt' | 'updatedAt'>>
export type PaymentUpdate = Updateable<Omit<PaymentTable, 'id' | 'createdAt' | 'updatedAt'>>

export interface GameTable {
    id: Generated<number>
    round: number
    date: ColumnType<Date>
    homeTeam: string
    awayTeam: string
    location: string
    gameTime: ColumnType<Date>
    courtNumber: number
    whoIsPaying: number
    createdAt: ColumnType<Date>
    updatedAt: ColumnType<Date>
}

export type Game = Selectable<GameTable>
export type NewGame = Insertable<Omit<GameTable, 'id' | 'createdAt' | 'updatedAt'>>
export type GameUpdate = Updateable<Omit<GameTable, 'id' | 'createdAt' | 'updatedAt'>>