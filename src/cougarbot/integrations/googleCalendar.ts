const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

import { CalendarEvent } from '../../types/basketball';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
	try {
		const content = await fs.readFile(TOKEN_PATH);
		const credentials = JSON.parse(content);
		return google.auth.fromJSON(credentials);
	} catch (err) {
		return null;
	}
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
	const content = await fs.readFile(CREDENTIALS_PATH);
	const keys = JSON.parse(content);
	const key = keys.installed || keys.web;
	const payload = JSON.stringify({
		type: 'authorized_user',
		client_id: key.client_id,
		client_secret: key.client_secret,
		refresh_token: client.credentials.refresh_token,
	});
	await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
	let client = await loadSavedCredentialsIfExist();
	if (client) {
		return client;
	}
	client = await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH,
	});
	if (client.credentials) {
		await saveCredentials(client);
	}
	return client;
}

export class GoogleCalendar {
	googleCalendarId: string;
	auth: typeof google.auth;
	calendar: typeof google.calendar;

	constructor() {
		this.googleCalendarId = (process.env.GOOGLE_CALENDAR_ID as string);

	}

	// Retrieves a list of events from a specified calendar
	async getEvent(): Promise<CalendarEvent> {

		try {
			this.auth = await authorize();
			this.calendar = google.calendar({ version: 'v3', auth: this.auth });

			const res = await this.calendar.events.list({
				calendarId: this.googleCalendarId,
				timeMin: new Date().toISOString(),
				maxResults: 10,
				singleEvents: true,
				orderBy: 'startTime',
				q: 'Basketball'
			});
			const events = res.data.items;
			if (!events || events.length === 0) {
				console.log('No upcoming events found.');
				throw new Error('No upcoming events found.');
			}
			events.map((event: any, i: any) => {
				if (event.summary.includes('Basketball')) {
					console.log('Found basketball game');
					return {
						summary: event.summary,
						location: event.location,
						description: event.description,
						startTime: event.start.dateTime || event.start.date
					};
				}
			});
			throw new Error('No basketball game found');
		} catch (error) {
			console.error('Cannot get events from calendar', error);
			throw new Error('Cannot get events from calendar');
		}
	}
}
