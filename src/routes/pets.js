const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {

    const { idDoctor, idClient, name, sex, species, age, weight } = req.body;

    connection.query('INSERT INTO pets SET ?', { idDoctor: idDoctor, idClient: idClient, name: name, sex: sex, species: species, age: age, weight: weight }, async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ response: `Registro de mascota exitoso. ID: ${results.insertId}` });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }


    });

});

router.get('/get-all', (req, res) => {

    connection.query(`SELECT * FROM pets`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ pets: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/:petId', (req, res) => {

    const petId = req.params.petId;

    connection.query('SELECT * FROM pets WHERE idPet = ?', [petId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ pet: results[0] });
                } else {
                    res.status(400).json({ error: 'No se encontró la mascota solicitada' });
                }
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/client/:clientId', (req, res) => {

    const clientId = req.params.clientId;

    connection.query(`SELECT * FROM pets WHERE idClient = ?`, [clientId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ pets: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/doctor/:doctorId', (req, res) => {

    const doctorId = req.params.doctorId;

    connection.query(`SELECT * FROM pets WHERE idDoctor = ?`, [doctorId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ pets: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.put('/edit/:petId', (req, res) => {

    const petId = req.params.petId;

    const { name, sex, species, age, weight } = req.body;

    const updatedInformation = { name, sex, species, age, weight };

    connection.query('UPDATE pets SET ? WHERE idPet = ?', [updatedInformation, petId], (error, results) => {
        try {
            if (error) {
                res.status(400).send({ error: error });
            } else {
                res.json({ response: `Mascota actualizada. ID: ${petId}` });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.delete('/delete/:petId', (req, res) => {

    const petId = req.params.petId;

    connection.query('DELETE FROM pets WHERE idPet = ?', [petId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ response: 'Mascota eliminada' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

module.exports = router;
