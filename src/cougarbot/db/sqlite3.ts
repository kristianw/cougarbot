const sqlite = require('better-sqlite3');
const path = require('path');
import { PaymentIndex, Player } from '../../types/basketball';

export class Database {
    private db: typeof sqlite;

    constructor() {
        this.db = new sqlite(path.resolve("./db/cougarbot.db"), { fileMustExist: true });
    }

    async query(sql: string, params: {}) {
        return this.db.prepare(sql).all();
    }

    async addPlayers(name: string): Promise<void> {
        await this.db.query(`INSERT INTO Players (playerName) VALUES ('Prince'),('Jesse'),('Walsh'),('Simo'),('Justin'),('Danny'),('Rhys')`, {});
    }

    async getPlayers(): Promise<Player[] | any> {
        const rows = await this.db.query(`SELECT * FROM Players`, {});
        if (Array.isArray(rows)) return rows.map((row: Player) => ({ playerId: row.playerId, playerName: row.playerName, availableToPlay: row.availableToPlay }));
        return [rows];
    }

    async addPaymentIndex(currentIndex: number): Promise<void> {
        await this.db.query(`INSERT INTO Payment (paymentIndex) VALUES (${currentIndex})`);
    }

    async close(): Promise<void> {
        await this.db.close();
    }
}
