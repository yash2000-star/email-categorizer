// emailFilter.js - Custom email filtering logic

function filterEmail(email, category) {
    const rules = {
      Spam: (email) => /win|lottery|free|prize|claim/i.test(email),
      Promotions: (email) => /sale|discount|offer|limited/i.test(email),
      Finance: (email) => /invoice|bank|payment|loan/i.test(email),
      Work: (email) => /meeting|project|deadline|report/i.test(email),
      Personal: (email) => /birthday|party|family|friend/i.test(email),
    };
  
    // Check if the email content matches any filtering rule
    if (rules[category] && rules[category](email)) {
      return `Filtered as ${category}`;
    } else {
      return "No filter applied";
    }
  }
  
  module.exports = { filterEmail };
  