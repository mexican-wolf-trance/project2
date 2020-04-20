const express = require("express");
const logger = require("./lib/middleware/logger")
const mongoRouter = require("./routes/mongoRoute")
const jplRouter = require("./routes/jplRoute")

const app = express();
const port = 3000;

app.use(logger)
app.use("/mongo", mongoRouter)
app.use("/jpl", jplRouter)
app.listen(port)

console.log("Now listening on port " + port);