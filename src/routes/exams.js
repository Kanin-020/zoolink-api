const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {
    const { idClinicHistory, type, result } = req.body;

    connection.query('SELECT * FROM exams WHERE type = ? AND idClinicHistory = ?', [type, idClinicHistory], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length > 0) {
                res.status(409).json({ error: 'Ya existe un examen con el mismo tipo para esta historia clínica' });
            } else {
                connection.query('INSERT INTO exams SET ?', { idClinicHistory, type, result }, (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: `Registro de examen exitoso. ID: ${results.insertId}` });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});

router.get('/get-all', (req, res) => {

    connection.query(`SELECT * FROM exams`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ exams: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.get('/get/:examId', (req, res) => {

    const examId = req.params.examId;

    connection.query('SELECT * FROM exams WHERE idExam = ?', [examId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ exam: results[0] });
                } else {
                    res.status(404).json({ error: 'Examen no encontrado' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/clinicHistory/:clinicHistoryId', (req, res) => {

    const clinicHistoryId = req.params.clinicHistoryId;

    connection.query('SELECT * FROM exams WHERE idClinicHistory = ?', [clinicHistoryId], async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ exams: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});


router.put('/edit/:examId', (req, res) => {
    const examId = req.params.examId;
    const { type, result } = req.body;
    const updatedInformation = { type, result };

    connection.query('SELECT * FROM exams WHERE idExam = ?', [examId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Examen no encontrado' });
            } else {
                connection.query('UPDATE exams SET ? WHERE idExam = ?', [updatedInformation, examId], (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: `Examen actualizado. ID: ${examId}` });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});

router.delete('/delete/:examId', (req, res) => {
    const examId = req.params.examId;

    connection.query('SELECT * FROM exams WHERE idExam = ?', [examId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Examen no encontrado' });
            } else {
                connection.query('DELETE FROM exams WHERE idExam = ?', [examId], (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: 'Examen eliminado' });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});

module.exports = router;
