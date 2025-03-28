const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

app.post('/sign-jwt', (req, res) => {
    const { header, payload, private_key } = req.body;
    if (!header || !payload || !private_key) {
        return res.status(400).json({ error: 'Missing header, payload or private_key' });
    }

    try {
        const token = jwt.sign(payload, private_key, {
            algorithm: 'RS256',
            header: header
        });
        return res.json({ jwt: token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`JWT Signer running on port ${PORT}`));