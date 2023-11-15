const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {
    const { idDoctor, idClient, idPet } = req.body;

    connection.query('SELECT * FROM clinic_history WHERE idPet = ?', [idPet], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length > 0) {
                res.status(409).json({ error: 'Ya existe una Historial clínico para esta mascota' });
            } else {
                connection.query('INSERT INTO clinic_history SET ?', { idDoctor, idClient, idPet }, (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: `Creación de historial exitosa. ID: ${results.insertId}` });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});

router.get('/get-all', (req, res) => {

    connection.query(`SELECT * FROM clinic_history`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ clinic_history: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.get('/get/:clinicHistoryId', (req, res) => {

    const clinicHistoryId = req.params.clinicHistoryId;

    connection.query('SELECT * FROM clinic_history WHERE idClinicHistory = ?', [clinicHistoryId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ clinic_history: results[0] });
                } else {
                    res.status(404).json({ error: 'Historial clínico no encontrada' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/client/:clientId', (req, res) => {

    const clientId = req.params.clientId;

    connection.query(`SELECT * FROM clinic_history WHERE idClient = ?`, [clientId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ clinic_history: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/doctor/:doctorId', (req, res) => {

    const doctorId = req.params.doctorId;

    connection.query(`SELECT * FROM clinic_history WHERE idDoctor = ?`, [doctorId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ clinic_history: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/pet/:petId', (req, res) => {

    const petId = req.params.petId;

    connection.query(`SELECT * FROM clinic_history WHERE idPet = ?`, [petId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ clinic_history: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.delete('/delete/:clinicHistoryId', (req, res) => {
    const clinicHistoryId = req.params.clinicHistoryId;

    connection.query('SELECT * FROM clinic_history WHERE idClinicHistory = ?', [clinicHistoryId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Historial clínico no encontrada' });
            } else {
                connection.query('DELETE FROM clinic_history WHERE idClinicHistory = ?', [clinicHistoryId], (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: 'Historial eliminado' });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});


module.exports = router;
