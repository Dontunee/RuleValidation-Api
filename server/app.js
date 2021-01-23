const express = require('express');
const { home } = require('./api/home');
const { validateRule } = require('./api/validate');
const { validator, validateDataField } = require('./middleware/utils');
const { requestBodySchema } = require('./middleware/schema');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', home);
app.post(
  '/validate-rule',
  validator(requestBodySchema),
  validateDataField,
  validateRule
);

//configure PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}........`));
