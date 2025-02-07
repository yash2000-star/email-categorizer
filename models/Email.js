class Email {
    constructor(id, subject, from, date, snippet) {
        this.id = id;
        this.subject = subject;
        this.from = from;
        this.date = date;
        this.snippet = snippet;
        this.category = null;  //Will be used later for categorization
    }

    setCategory(category) {
        this.category = category;
    }
}

module.exports = Email;