const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const db = require("./config/db");

const bodyParser = require("body-parser");

const { usuarios, productos } = require("./models/modelsIndex.js");

//routes
const home = require("./routes/home");
const store = require("./routes/routesIndex");

const app = express();

//revisar despues
app.use(express.static(path.join(__dirname, "views/layouts")));

app.engine(
  "hbs",
  expressHbs({
    layoutDir: "views/layouts/",
    defaultLayout: "main",
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", store);
// app.use('/', home)

const port = 5071;

app.listen(port, async () => {
  console.log(`App working correctly on port ${port}`);
  try {
    await db.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
