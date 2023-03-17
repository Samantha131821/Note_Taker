const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const {readFile} = require('fs/promises');
const { raw } = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.use("/api/", apiRoutes)
app.use("/", htmlRoutes)


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);