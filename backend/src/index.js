/**
 * Required External Modules
 */
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const { checkJwt } = require("./auth/check-jwt");
const jwtAuthz = require("express-jwt-authz");

/**
 * App Variables
 */

const app = express();
const apiRouter = express.Router();
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    name: 'Coninx Comics API - Software Security'
  })
});

app.use("/api", apiRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

/**
 * Server Activation
 */

app.listen(process.env.PORT || 6060, () =>
  console.log(`Coninx Comics API Server listening on port ${process.env.PORT}`)
);


apiRouter.get('/getAllComics', (req, res) => {
  pool.query('SELECT * FROM comics ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

apiRouter.post('/getComicById', (req, res) => {
  const comicId = JSON.parse(req.body.id);
  pool.query('SELECT * FROM comics WHERE id = $1', [comicId], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0]);
  })
});

apiRouter.post('/createComic',checkJwt, (req, res) => {
  const title = req.body.title;
  const published = req.body.published;
  const issue = req.body.issue;
  const writer = req.body.writer;
  const description = req.body.description;
  const values = [title, published, issue, writer, description];
  pool.query('INSERT INTO comics (title, published, issue, writer, description) VALUES($1, $2, $3, $4, $5)', values, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    res.status(200).json('Success');
  })
});