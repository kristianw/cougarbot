
import { Kysely, sql } from "kysely";
import { createPlayer } from "./queries/playerRepository";
import { createPayment } from "./queries/paymentRepository";
import { db } from "./database";

export const up = async (db: Kysely<any>): Promise<void> => {
    await db.schema.createTable('player')
        .ifNotExists()
      .addColumn('id', 'serial', (cb) => cb.primaryKey())
      .addColumn('playerName', 'varchar', (cb) => cb.notNull())
      .addColumn('availableToPlay', 'boolean')
      .addColumn('createdAt', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .addColumn('updatedAt', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
        .execute();

    await db.schema.createTable('payment')
        .ifNotExists()
        .addColumn('id', 'serial', (cb) => cb.primaryKey())
        .addColumn('paymentIndex', 'integer', (cb) => cb.notNull())
        .addColumn('createdAt', 'timestamp', (cb) =>
            cb.notNull().defaultTo(sql`now()`)
        )
        .addColumn('updatedAt', 'timestamp', (cb) =>
            cb.notNull().defaultTo(sql`now()`)
        )
        .execute();

    await db.schema.createTable('game')
        .ifNotExists()
        .addColumn('id', 'serial', (cb) => cb.primaryKey())
        .addColumn('round', 'integer', (cb) => cb.notNull())
        .addColumn('date', 'timestamp', (cb) => cb.notNull())
        .addColumn('homeTeam', 'varchar', (cb) => cb.notNull())
        .addColumn('awayTeam', 'varchar', (cb) => cb.notNull())
        .addColumn('location', 'varchar', (cb) => cb.notNull())
        .addColumn('gameTime', 'timestamp', (cb) => cb.notNull())
        .addColumn('courtNumber', 'integer', (cb) => cb.notNull())
        .addColumn('whoIsPaying', 'integer', (cb) => cb.notNull())
        .addColumn('createdAt', 'timestamp', (cb) =>
            cb.notNull().defaultTo(sql`now()`)
        )
        .addColumn('updatedAt', 'timestamp', (cb) =>
            cb.notNull().defaultTo(sql`now()`)
        )
        .execute();
}

const setUp = async (db: Kysely<any>): Promise<void> => {
    await up(db)

    const players = [
        {playerName: 'Prince', availableToPlay: true},
        {playerName: 'Jesse', availableToPlay: true},
        {playerName: 'Walsh', availableToPlay: true},
        {playerName: 'Simo', availableToPlay: true},
        {playerName: 'Justin', availableToPlay: true},
        {playerName: 'Danny', availableToPlay: true},
        {playerName: 'Rhys', availableToPlay: true},
    ];

    await Promise.all(players.map(async (player) => {
        await createPlayer(player);
    }));
    await createPayment({paymentIndex: 0})
}

setUp(db).catch((err) => {
    console.error(err);
    process.exit(1);
});