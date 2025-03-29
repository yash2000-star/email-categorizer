const axios = require("axios");
require("dotenv").config();

// Function to categorize an email using OpenAI
async function categorizeEmail(emailText) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI email categorization assistant. Categorize emails into: Work, Personal, Promotions, Spam, or Finance.",
          },
          {
            role: "user",
            content: `Categorize this email: ${emailText}`,
          },
        ],
        temperature: 0.5, // Low randomness for consistency
        max_tokens: 10, // Short response (just category)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the response text (category)
    const category = response.data.choices[0].message.content.trim();
    return category;
  } catch (error) {
    console.error("Error categorizing email:", error.response?.data || error.message);
    return "Unknown"; // Return "Unknown" in case of errors
  }
}

module.exports = { categorizeEmail };
