const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {

    const { idReceiver, message } = req.body;

    connection.query('INSERT INTO reminders SET ?', { idReceiver: idReceiver, message: message }, async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ response: `Registro de recordatorio exitoso. ID: ${results.insertId}` });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }


    });

});

router.get('/get-all', (req, res) => {

    connection.query(`SELECT * FROM reminders`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ reminders: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/:reminderId', (req, res) => {

    const reminderId = req.params.reminderId;

    connection.query('SELECT * FROM reminders WHERE idReminder = ?', [reminderId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ reminder: results[0] });
                } else {
                    res.status(400).json({ error: 'No se encontró el recordatorio solicitado' });
                }
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/receiver/:receiverId', (req, res) => {

    const receiverId = req.params.receiverId;

    connection.query(`SELECT * FROM reminders WHERE idReceiver = ?`, [receiverId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ reminders: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});


router.put('/edit/:reminderId', (req, res) => {

    const reminderId = req.params.reminderId;

    const { message } = req.body;

    const updatedInformation = { message };

    connection.query('UPDATE reminders SET ? WHERE idReminder = ?', [updatedInformation, reminderId], (error, results) => {
        try {
            if (error) {
                res.status(400).send({ error: error });
            } else {
                res.json({ response: `Recordatorio actualizado. ID: ${reminderId}` });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.delete('/delete/:reminderId', (req, res) => {

    const reminderId = req.params.reminderId;

    connection.query('DELETE FROM reminders WHERE idReminder = ?', [reminderId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ response: 'Recordatorio eliminado' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

module.exports = router;
