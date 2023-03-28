import sqlite3 from "sqlite3";
import { PaymentIndex, Player } from '../../types/basketball';

export class Database {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database(":memory:");
        this.setup();
    }

    private async setup() {
        await this.db.run("CREATE TABLE IF NOT EXISTS players (  playerId INTEGER PRIMARY KEY AUTOINCREMENT, playerName TEXT UNIQUE NOT NULL, availableToPlay INTEGER NOT NULL DEFAULT 1)");
        await this.db.run("CREATE TABLE IF NOT EXISTS payment_index (  paymentIndex INTEGER PRIMARY KEY AUTOINCREMENT DEFAULT 1 )");
        
    }

    async addPlayers(name: string): Promise<void> {
        await this.db.run("INSERT INTO players (playerName) VALUES ('Prince'),('Jesse'),('Walsh'),('Simo'),('Justin'),('Danny'),('Rhys')");
    }

    async getPlayers(): Promise<Player[] | any> {
        const rows = await this.db.all("SELECT * FROM players");
        if (Array.isArray(rows)) return rows.map((row: Player) => ({ playerId: row.playerId, playerName: row.playerName, availableToPlay: row.availableToPlay }));
        return [rows];
    }

    async addPaymentIndex(currentIndex: number): Promise<void> {
        await this.db.run("INSERT INTO payment_index (paymentIndex) VALUES (`${currentIndex}`)");
    }

    async getPaymentIndex(): Promise<number | any> {
        const row = await this.db.get("SELECT * FROM payment_index");
        if (Number.isInteger(row)) return row;
        console.log('Payment Index: ', row);
        return row;
    }

    async close(): Promise<void> {
        await this.db.close();
    }
}
