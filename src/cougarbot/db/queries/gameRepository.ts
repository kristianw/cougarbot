import { sub } from 'date-fns'
import { db } from "../database";
import { Game, NewGame, GameUpdate } from "../interfaces";

export async function findGames(): Promise<Game[]> {
    const query = db.selectFrom('game')
    return await query.selectAll().execute();
}

export async function getNextGame(today: Date): Promise<Game> {
    const yesterday = sub(today, { days: 1 });
    // get the day before of the date variable
    // const yesterday: Date = new Date(today).setDate(today.getDate() - 1)
    // const yesterdayDate = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`

    return await db.selectFrom('game')
    .selectAll()
    .where(
        'date', '>=', yesterday,
    )
    .where('date', '<=', today
    )
    .executeTakeFirstOrThrow()
}

export async function createGame(game: NewGame): Promise<Game> {
    return await db.insertInto('game')
    .values({
        ...game,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function updateGame(id: number, game: GameUpdate): Promise<void> {
    await db.updateTable('game').set(game).where('id', '=', id).execute()
}