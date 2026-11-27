const dotenv = require('dotenv');

if (process.argv[2] === 'prod') {
  dotenv.config({ path: './.env.production' })
  console.log("PRODUCTION MODE");
} else
  if (process.argv[2] === 'dev') {
    dotenv.config({ path: './.env.development' })
    console.log("DEVELOPMENT MODE");
  }

const express = require('express');
const morgan = require('morgan');

const ErrorHandler = require('./middlewares/errorHandler.middleware');
const AppError = require('./utils/appError');
const { PostgresError } = require('postgres').default;
const sql = require('./config/postgresDB');
const log = require('./utils/log');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth.router');
const selfRouter = require('./routes/self.router');

const port = process.env.PORT;
const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/self', selfRouter);


app.use((req, res, next) => {
  next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`))
})

app.use(ErrorHandler);

async function startServer() {
  try {

    await sql`SELECT 1`;
    log.ok(`Connection to PostgreSQL "${process.env.DB_DATABASE}" database is successfull `);

    app.listen(port, () => {
      log.ok(`Cammareros-Server listening on port ${port}`);

    })

  } catch (err) {
    if (err instanceof PostgresError) {
      log.warn('Unable to connect with the PostgreSQL database!');
      log.error(err.message);
    } else {
      log.warn('Unable to start the server!');
      log.error(err.message);
    }

    process.exit(1)
  }
}

startServer();
