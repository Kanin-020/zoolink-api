const express = require('express');
const cors = require('cors');

const userModel = require('./src/routes/users');
const petModel = require('./src/routes/pets');
const appointmentModel = require('./src/routes/appointments');
const clinic_history = require('./src/routes/clinicHistory');
const recipe = require('./src/routes/recipes');
const exam = require('./src/routes/exams');
const reminder = require('./src/routes/reminders');

const app = express();

const PORT = 3000;

//Config
app.use(cors({ cors: "127.0.0.1:5173" }));
//app.use(cors({ origin: "127.0.0.1" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userModel);
app.use("/pets", petModel);
app.use("/appointments", appointmentModel);
app.use("/history", clinic_history);
app.use("/recipes", recipe);
app.use("/exams", exam);
app.use("/reminders", reminder);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
