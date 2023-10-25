const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {

    const { idDoctor, idClient, idPet, date, state, reason } = req.body;

    connection.query('INSERT INTO appointments SET ?', { idDoctor: idDoctor, idClient: idClient, idPet: idPet, date: date, state: state, reason: reason }, async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ response: `Registro de cita exitoso. ID: ${results.insertId}` });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });


});

router.get('/get-all', (req, res) => {

    connection.query(`SELECT * FROM appointments`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ appointments: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.get('/get/:appointmentId', (req, res) => {

    const appointmentId = req.params.appointmentId;

    connection.query('SELECT * FROM appointments WHERE idAppointment = ?', [appointmentId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ appointment: results[0] });
                } else {
                    res.status(400).json({ error: 'No se encontraron las citas solicitadas' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/client/:clientId', (req, res) => {

    const clientId = req.params.clientId;

    connection.query('SELECT * FROM appointments WHERE idClient = ?', [clientId], async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ appointments: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/doctor/:doctorId', (req, res) => {

    const doctorId = req.params.doctorId;

    connection.query('SELECT * FROM appointments WHERE idDoctor = ?', [doctorId], async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ appointments: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/pet/:petId', (req, res) => {

    const petId = req.params.petId;

    connection.query('SELECT * FROM appointments WHERE idPet = ?', [petId], async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ appointments: results });
                } else {
                    res.status(400).json({ error: 'No se encontraron las citas solicitadas' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.put('/edit/:appointmentId', (req, res) => {

    const appointmentId = req.params.appointmentId;

    const { date, state, reason } = req.body;

    const updatedInformation = { date, state, reason };

    connection.query('UPDATE appointments SET ? WHERE idAppointment = ?', [updatedInformation, appointmentId], (error, results) => {
        try {
            if (error) {
                res.status(400).send({ error: error });
            } else {
                res.json({ response: `Cita actualizada. ID: ${appointmentId}` });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.delete('/delete/:appointmentId', (req, res) => {

    const appointmentId = req.params.appointmentId;

    connection.query('DELETE FROM appointments WHERE idAppointment = ?', [appointmentId], (error, results) => {

        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ response: 'Cita eliminada' });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

module.exports = router;
