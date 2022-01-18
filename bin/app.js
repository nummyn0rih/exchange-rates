#!/usr/bin/env node

const app = require('../index');
const config = require('config');

const PORT = config.get('port') || 6000;

app.listen(PORT, () => console.log(`Server was started on ${PORT}`));
