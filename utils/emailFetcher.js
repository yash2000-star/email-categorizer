const { google } = require("googleapis");
const { oauth2Client } = require("./auth");
const { categorizeEmail } = require("./emailCategorizer");
const { filterEmail } = require("./emailFilter");

async function fetchEmails() {
  try {
    console.log("🚀 Fetching emails..."); // Debug log

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Get list of emails
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
      labelIds: ["INBOX"], // Fetch from inbox
    });

    if (!response.data.messages) {
      console.log("⚠️ No emails found!");
      return [];
    }

    const emails = [];

    // Fetch detailed info for each email
    for (const message of response.data.messages) {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });

      // Extract relevant info
      const headers = email.data.payload.headers;
      const subject = headers.find((h) => h.name === "Subject")?.value;
      const from = headers.find((h) => h.name === "From")?.value;
      const date = headers.find((h) => h.name === "Date")?.value;
      const snippet = email.data.snippet; // Short preview of email body

      console.log("\n📩 **New Email Fetched**");
      console.log(`From: ${from}`);
      console.log(`Subject: ${subject}`);
      console.log(`Snippet: ${snippet}`);

      // Step 1: Categorize email using AI
      const category = await categorizeEmail(snippet);
      console.log(`📌 **Category:** ${category}`);

      // Step 2: Apply Filtering
      const filterResult = filterEmail(snippet, category);
      console.log(`⚙️ **Filter Result:** ${filterResult}`);

      emails.push({
        id: message.id,
        subject,
        from,
        date,
        snippet,
        category,
        filterResult,
      });
    }

    return emails;
  } catch (error) {
    console.error("❌ Error fetching emails:", error.message);
  }
}

fetchEmails(); // Run immediately to test

module.exports = { fetchEmails };
