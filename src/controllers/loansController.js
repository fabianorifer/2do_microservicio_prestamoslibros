const pool = require('../models/loanModel');

// Registrar un nuevo préstamo
const createLoan = async (req, res) => {
    const { book_id, loan_date, return_date } = req.body;
    const user_id = req.user.userId;  // El user_id viene del token JWT

    try {
        const result = await pool.query(
            'INSERT INTO loans (book_id, user_id, loan_date, return_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [book_id, user_id, loan_date, return_date]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el préstamo' });
    }
};

// Registrar una devolución
const returnLoan = async (req, res) => {
    const { loan_id } = req.body;
    const user_id = req.user.userId; // El user_id viene del token JWT
    const return_date = new Date(); // Fecha actual

    try {
        // Actualizamos la fecha de devolución solo si el préstamo pertenece al usuario
        const result = await pool.query(
            'UPDATE loans SET return_date = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [return_date, loan_id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Préstamo no encontrado o no pertenece al usuario' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar la devolución' });
    }
};

// Consultar historial de préstamos por usuario
const getLoanHistory = async (req, res) => {
    const user_id = req.user.userId;  // El user_id viene del token JWT

    try {
        const result = await pool.query(
            'SELECT * FROM loans WHERE user_id = $1',
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron préstamos para este usuario' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al consultar el historial de préstamos' });
    }
};

module.exports = { createLoan, returnLoan, getLoanHistory };
