const express = require("express");

const connectDatabase = require("./app/database/databaseInit");
const { SERVER_PORT } = require("./app/constants");
const errorHandler = require('./app/middleware/errorHandlers')

const userRouter = require("./app/routes/userRoutes");

const app = express();

var cors = require('cors')

app.use(cors())

connectDatabase();

app.use(express.json());
app.use(errorHandler)

var requestBodyParser = require('body-parser')

app.use(requestBodyParser.json({limit:'5mb'}))
app.use(requestBodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:50000}));

app.use("/api/users", userRouter);

app.get("/PING", (_, res) => {
  res.status(200).json({
    message: "PONG",
  });
});

var server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running at port : ${SERVER_PORT}`);
});

module.exports = {
  app,
  server
}