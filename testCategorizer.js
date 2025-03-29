const { categorizeEmail } = require("./utils/emailCategorizer");
const { filterEmail } = require("./utils/emailFilter");

async function test() {
  const emailText = "i get your email Thank you for sharing your leave application with us today is your sons birthday and we are grandting you a leave from office wish him a happy birthday";
  
  // Step 1: Categorize the email
  const category = await categorizeEmail(emailText);
  console.log("Email Category:", category);
  
  // Step 2: Apply filtering rules
  const filterResult = filterEmail(emailText, category);
  console.log("Filter Result:", filterResult);
}

test();
