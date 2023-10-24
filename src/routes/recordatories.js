const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {

    const { idDestinatary, message } = req.body;

    connection.query('INSERT INTO recordatories SET ?', { idDestinatary: idDestinatary, message: message }, async (error, results) => {
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

    connection.query(`SELECT * FROM recordatories`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ recordatories: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/:recordatoryId', (req, res) => {

    const recordatoryId = req.params.recordatoryId;

    connection.query('SELECT * FROM recordatories WHERE idRecordatory = ?', [recordatoryId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ recordatory: results[0] });
                } else {
                    res.status(400).json({ error: 'No se encontró el recordatorio solicitado' });
                }
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/destinatary/:destinataryId', (req, res) => {

    const destinataryId = req.params.destinataryId;

    connection.query(`SELECT * FROM recordatories WHERE idDestinatary = ?`, [destinataryId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ recordatories: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});


router.put('/edit/:recordatoryId', (req, res) => {

    const recordatoryId = req.params.recordatoryId;

    const { message } = req.body;

    const updatedInformation = { message };

    connection.query('UPDATE recordatories SET ? WHERE idRecordatory = ?', [updatedInformation, recordatoryId], (error, results) => {
        try {
            if (error) {
                res.status(400).send({ error: error });
            } else {
                res.json({ response: `Recordatorio actualizado. ID: ${recordatoryId}` });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.delete('/delete/:recordatoryId', (req, res) => {

    const recordatoryId = req.params.recordatoryId;

    connection.query('DELETE FROM recordatories WHERE idRecordatory = ?', [recordatoryId], (error, results) => {
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
