const express = require('express');
const router = express.Router();

router.get('/', (_, responce) => {
    responce.send('Well');
});

module.exports = router;