const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {

    const { idUser, name, sex, species, age, weight } = req.body;

    connection.query('INSERT INTO pets SET ?', { idUser: idUser, name: name, sex: sex, species: species, age: age, weight: weight }, async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: 'Error a registrar la mascota' });
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
                res.status(400).json({ error: 'No se pudo obtener la lista de mascotas' });
            } else {
                if (results) {
                    res.json({ pets: results });
                } else {
                    res.status(400).json({ error: 'No hay mascotas en la base de datos' });
                }
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
                res.status(400).json({ error: 'No se pudo obtener la mascota solicitada' });
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

router.put('/edit/:petId', (req, res) => {

    const petId = req.params.petId;

    const { name, sex, species, age, weight } = req.body;

    const updatedInformation = { name, sex, species, age, weight };

    connection.query('UPDATE pets SET ? WHERE idPet = ?', [updatedInformation, petId], (error, results) => {
        try {
            if (error) {
                res.status(400).send({ error: 'No se pudo actualizar la información de la mascota' });
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
                res.status(400).json({ error: 'No se pudo eliminar la mascota' });
            } else {
                res.json({ response: 'Mascota eliminada' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

module.exports = router;
