const dotenv = require('dotenv');

const result = dotenv.config();

if (result.error) throw new Error(result.error);

const { parsed: envs } = result;

module.exports = envs;
