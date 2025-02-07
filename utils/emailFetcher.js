const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { oauth2Client } = require('./auth');


async function fetchEmails() {
    try {
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client});

        //get list of emails
        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 10 //Start with 10 emails for testing 
        });

        const emails = [];

        //Fetch detailed info for each email
        for (const message of response.data.messages) {
            const email = await gmail.users.messages.get({
                userId: 'me',
                id: message.id
            });

            //Extract relevant info
            const headers = email.data.payload.headers;
            const subject = headers.find(h => h.name === 'Subject')?.value;
            const from = headers.find(h => h.name === 'From')?.value;
            const date = headers.find(h => h.name === 'Date')?.value;

            emails.push({
                id: message.id,
                subject,
                from,
                date,
                snippet: email.data.snippet
            });
        }

        return emails;
    } catch (error) {
        throw new Error(`Failed to fetch emails: ${error.message}`);
    }
}

module.exports = { fetchEmails}