const express = require('express');
const loansRoutes = require('./routes/loansRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', loansRoutes);

app.listen(port, () => {
    console.log(`Microservicio de préstamos escuchando en http://localhost:${port}`);
});
