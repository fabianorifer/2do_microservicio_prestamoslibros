const express = require('express');
const { createLoan, returnLoan, getLoanHistory } = require('../controllers/loansController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Registrar préstamo
router.post('/loans', authMiddleware, createLoan);

// Registrar devolución
router.put('/loans/return', authMiddleware, returnLoan);

// Consultar historial de préstamos
router.get('/loans/history', authMiddleware, getLoanHistory);

module.exports = router;
