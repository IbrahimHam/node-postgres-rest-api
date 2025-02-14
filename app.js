const express = require('express');
const userRoutes = require("./routes/users")
const orderRoutes = require("./routes/orders")
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
