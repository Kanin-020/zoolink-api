const express = require('express');
const router = express.Router();
const connection = require('../utils/databaseConnection');

router.post('/add-pet', (req, res) => {

    const { idUser, name, sex, species, age, weight } = req.body;

    connection.query('INSERT INTO pets SET ?', {idUser: idUser, name: name, sex: sex, species: species, age:age, weight: weight }, async (error, results) => {
        try{
            if(error){
                res.status(400).json({error: 'Error a registrar la mascota'});
            } else{
                res.json(`Registro de mascota exitoso. ID: ${results.insertId}`);
            }

        } catch(error){
             res.status(500).json({error: error});
        }


    });

});

module.exports = router;
