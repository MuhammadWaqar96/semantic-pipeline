const express = require("express");
const bodyParser = require("body-parser");

const ingestRoute = require("./ingest");
const searchRoute = require("./search");

const app = express();
app.use(bodyParser.json());

app.post("/ingest", ingestRoute);
app.get("/search", searchRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
