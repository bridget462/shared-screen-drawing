const express = require("express");

console.log("my server");

const app = express();
const server = app.listen(3000);

app.use(express.static("./public"));
