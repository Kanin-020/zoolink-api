const express = require('express');
const cors = require('cors');

const userModel = require('./src/routes/user');
const petModel = require('./src/routes/pet');
const appointmentModel = require('./src/routes/appointment');
const clinic_history = require('./src/routes/clinicHistory');
const recipe = require('./src/routes/recipes');
const exam = require('./src/routes/exams');
const recordatory = require('./src/routes/recordatories');

const app = express();

const PORT = 3000;

//Config
// app.use(cors({ cors: "127.0.0.1:4200" }));
app.use(cors({ origin: "127.0.0.1" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userModel);
app.use("/pet", petModel);
app.use("/appointment", appointmentModel);
app.use("/history", clinic_history);
app.use("/recipe", recipe);
app.use("/exam", exam);
app.use("/recordatory", recordatory);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
