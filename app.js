const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const decodeHelper = require("./utils");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);
router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/decode", (req, res) => {
  // console.log(req.body);
  const data = decodeHelper(req.body.data);
  res.json(data);
});
app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});
app.listen(3000, () => {
  console.log("Started on PORT 3000");
});
