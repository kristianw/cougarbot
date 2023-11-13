import { db } from "../database";
import { Player, NewPlayer, PlayerUpdate } from "../interfaces";

export async function findPlayers(): Promise<Player[]> {
    const query = db.selectFrom('player')
    return await query.selectAll().execute();
}

export async function createPlayer(player: NewPlayer): Promise<Player> {
    return await db.insertInto('player')
    .values({
        playerName: player.playerName,
        availableToPlay: player.availableToPlay,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function updatePlayer(playerName: string, player: PlayerUpdate): Promise<void> {
    await db.updateTable('player').set(player).where('playerName', '=', playerName).execute()
}