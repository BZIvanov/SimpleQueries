require('dotenv').config();
const cors = require('cors');
const express = require('express');
require('./db');
const mountRoutes = require('./routes');
const globalError = require('./middleware/global-error');

const app = express();

app.use(express.json());
app.use(cors());

mountRoutes(app);
app.use(globalError);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server Started');
});
