const { fetchEmails } = require('../utils/emailFetcher');


const emailController = {
    async getEmails(req, res) {
        try {
            const emails = await fetchEmails();
            res.json({ success: true, data: emails });
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    }
};

module.exports = emailController;