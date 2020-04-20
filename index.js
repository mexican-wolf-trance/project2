const express = require("express");
const logger = require("./lib/middleware/logger")
const mongoRouter = require("./routes/mongoRoute")

const app = express();
const port = 3000;

app.use(logger)
app.use("/", mongoRouter)
app.listen(port)

console.log("Now listening on port " + port);