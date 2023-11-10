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
                res.status(400).json({ error: error });
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
                res.status(400).json({ error: error });
            } else {

                const user = results[0];

                if (user.password == password) {

                    connection.query(dateQuery, () => {
                        res.json({
                            rol: user.rol,
                            ok: true
                        });
                    });

                } else {
                    res.json({
                        ok: false
                    })
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
                res.status(400).json({ error: error });
            } else {
                res.json({ users: results });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.get('/get-clients', (req, res) => {

    connection.query(`SELECT * FROM users WHERE rol = 'client'`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results) {
                    res.json({ clients: results });
                } else {
                    res.status(400).json({ error: 'No hay clientes en la base de datos' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get-doctors', (req, res) => {

    connection.query(`SELECT * FROM users WHERE rol = 'doctor'`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results) {
                    res.json({ doctors: results });
                } else {
                    res.status(400).json({ error: 'No hay doctores en la base de datos' });
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
                res.status(400).json({ error: error });
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
                res.status(400).send({ error: error });
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
                res.status(400).json({ error: error });
            } else {
                res.json({ response: 'Usuario eliminado' });
            }

        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});


module.exports = router;
