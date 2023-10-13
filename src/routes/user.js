const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/register', (req, res) => {

    const dateObject = new Date();

    const { username, email, password, rol, birthdayDate } = req.body;

    const registerDate = dateObject.toLocaleString();

    const lastLoginDate = 'none';

    connection.query('INSERT INTO users SET ?', { username: username, email: email, password: password, rol: rol, birthdayDate: birthdayDate, registerDate: registerDate, lastLoginDate: lastLoginDate }, async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: 'Error al registrar el usuario' });
            } else {
                res.json({ response: `Registro de usuario exitoso. ID: ${results.insertId}` });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.post('/login', (req, res) => {

    const dateObject = new Date();

    const { username, password } = req.body;
    const loginQuery = `SELECT * FROM users WHERE username = '${username}'`;
    const lastLoginDate = dateObject.toLocaleString();
    const dateQuery = `UPDATE users SET lastLoginDate = '${lastLoginDate}' WHERE username = '${username}'`;

    connection.query(loginQuery, (error, results) => {
        try {
            if (error) {

                res.status(400).json({ error: 'Error al iniciar sesión' });

            } else {

                const user = results[0];

                if (user.password == password) {

                    connection.query(dateQuery, () => {
                        res.json({ response: 'Inicio de sesión válido' });
                    });

                }

            }

        } catch (error) {
            res.status(500).json({ error: error });
        }


    });

});

router.get('/get-all', (req, res) => {

    connection.query(`SELECT * FROM users`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: 'No se pudo obtener la lista de usuarios' });
            } else {
                if (results) {
                    res.json({ users: results });
                } else {
                    res.status(400).json({ error: 'No hay usuarios en la base de datos' });
                }
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.get('/get/:userId', (req, res) => {

    const userId = req.params.userId;

    connection.query('SELECT * FROM users WHERE idUser = ?', [userId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: 'No se pudo obtener el usuario' });
            } else {
                if (results[0]) {
                    res.json({ user: results[0] });
                } else {
                    res.status(400).json({ error: 'No se encontró el usuario solicitado' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.put('/edit/:userId', (req, res) => {

    const userId = req.params.userId;

    const { username, email, password, rol, birthdayDate } = req.body;

    const updatedInformation = { username, email, password, rol, birthdayDate };

    connection.query('UPDATE users SET ? WHERE idUser = ?', [updatedInformation, userId], (error, results) => {

        try {
            if (error) {
                res.status(400).send({ error: 'No se pudo actualizar la información del usuario' });
            } else {
                res.json({ response: `Usuario actualizado. ID: ${userId}` });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });


});

router.delete('/delete/:userId', (req, res) => {

    const userId = req.params.userId;

    connection.query('DELETE FROM users WHERE idUser = ?', [userId], (error, results) => {

        try {
            if (error) {
                res.status(400).json({ error: 'No se pudo eliminar el usuario' });
            } else {
                res.json({ response: 'Usuario eliminado' });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});


module.exports = router;
