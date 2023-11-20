import dotenv from 'dotenv';
import { Config } from "../types/config";

dotenv.config({
    path: './../../.env'
});


export const localConfig: Config = {
    googleCalendarId: process.env.GOOGLE_CALENDAR_ID ?? '',
    databaseName: process.env.DATABASE_NAME ?? '',
    databaseUsername: process.env.DATABASE_USERNAME ?? '',
    databasePassword: process.env.DATABASE_PASSWORD ?? '',
    databaseHost: process.env.DATABASE_HOST ?? '',
    databasePort: parseInt(process.env.DATABASE_PORT ?? '5432'),
    apiPort: parseInt(process.env.API_PORT ?? '9000'),
    signalEndpoint: process.env.SIGNAL_ENDPOINT ?? '',
    signalSourceNumber: process.env.SIGNAL_SOURCE_NUMBER ?? '',
    signalGroupId: process.env.SIGNAL_GROUP_ID ?? ''
}