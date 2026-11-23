const express = require('express');
const dotenv = require('dotenv');
const AppError = require('./utils/AppError');
// const postgres = require('postgres').default;

console.log(process.argv);


if (process.argv[2] === 'prod') {
  dotenv.config({ path: './.env.production' })
  console.log("PRODUCTION MODE");

} else
  if (process.argv[2] === 'dev') {
    dotenv.config({ path: './.env.development' })
    console.log("DEVELOPMENT MODE");

  }


const app = express();



// const sql = postgres({
//   host: 'localhost',
//   port: '6543',
//   database: 'cammarerodDB',
//   username: 'cammareros_db',
//   password: 'cammareros30'
// })


app.listen(process.env.PORT, () => {
  console.log(`CammarerosServer listening on port ${process.env.PORT}`);

})
