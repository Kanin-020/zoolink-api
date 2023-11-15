const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add', (req, res) => {
    const { idClinicHistory, medicine, dose } = req.body;

    connection.query('SELECT * FROM recipes WHERE medicine = ? AND idClinicHistory = ?', [medicine, idClinicHistory], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length > 0) {
                res.status(409).json({ error: 'Ya existe una receta con el mismo medicamento para esta historia clínica' });
            } else {
                connection.query('INSERT INTO recipes SET ?', { idClinicHistory, medicine, dose }, (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: `Registro de receta exitoso. ID: ${results.insertId}` });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});

router.get('/get-all', (req, res) => {

    connection.query(`SELECT * FROM recipes`, (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ recipes: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });

});

router.get('/get/:recipeId', (req, res) => {

    const recipeId = req.params.recipeId;

    connection.query('SELECT * FROM recipes WHERE idRecipes = ?', [recipeId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                if (results[0]) {
                    res.json({ recipe: results[0] });
                } else {
                    res.status(404).json({ error: 'No se encontraron las recetas solicitadas' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.get('/get/clinicHistory/:clinicHistoryId', (req, res) => {

    const clinicHistoryId = req.params.clinicHistoryId;

    connection.query('SELECT * FROM recipes WHERE idClinicHistory = ?', [clinicHistoryId], async (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.json({ recipes: results });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }

    });

});

router.put('/edit/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
    const { medicine, dose } = req.body;
    const updatedInformation = { medicine, dose };

    connection.query('SELECT * FROM recipes WHERE idRecipes = ?', [recipeId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Receta no encontrada' });
            } else {
                connection.query('UPDATE recipes SET ? WHERE idRecipes = ?', [updatedInformation, recipeId], (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: `Receta actualizada. ID: ${recipeId}` });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});

router.delete('/delete/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;

    connection.query('SELECT * FROM recipes WHERE idRecipes = ?', [recipeId], (error, results) => {
        try {
            if (error) {
                res.status(400).json({ error: error });
            } else if (results.length === 0) {
                res.status(404).json({ error: 'Receta no encontrada' });
            } else {
                connection.query('DELETE FROM recipes WHERE idRecipes = ?', [recipeId], (error, results) => {
                    if (error) {
                        res.status(400).json({ error: error });
                    } else {
                        res.json({ response: 'Receta eliminada' });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
});

module.exports = router;
