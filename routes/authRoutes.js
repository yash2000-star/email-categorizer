const express = require('express');
const router = express.Router();
const { getAuthUrl, getTokens } = require('../utils/auth');

router.get('/google', (req, res) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
});

router.get('/google/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const tokens = await getTokens(code);
        res.redirect('/test'); // Redirect back to test page after authentication
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;