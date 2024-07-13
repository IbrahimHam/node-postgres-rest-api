const express = require('express');
// const dotenv = require('dotenv');
// const db = require('./db/client');

// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    return "Hello wold"
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
