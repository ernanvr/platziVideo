const fs = require('fs');
//fs es un módulo de NodeJS

fs.writeFileSync('./.env', `APIKey=${process.env.APIKey}\n`);
