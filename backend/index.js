const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Middleware
app.use(cors());

// Postgres connection pool
const pool = new Pool({
    user: 'your user name',
    host: 'localhost',
    database: 'your database name',
    password: 'your password ',
    port: 5432,
});

// API endpoint to get state data
app.get('/api/state-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM state_data');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching state data:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
