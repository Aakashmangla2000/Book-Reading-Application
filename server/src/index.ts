import express from "express";
import bodyparser from "body-parser";
const cors = require("cors");

const app = express();
const port = 3001;

const bookRoutes = require("../routes/bookRoutes");

app.use(express.static("public"));

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/api/v1/books", bookRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
