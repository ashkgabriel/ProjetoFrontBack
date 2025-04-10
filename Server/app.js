let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

let app = express();

app.get("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Reqested-With, Content-Type, Accept"
  );
  next();
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.static("views"));

let url = "mongodb://localhost:27017/DevMobile";

mongoose
  .connect(url)
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
  });

let User = mongoose.model("Usuario", new mongoose.Schema({ name: String }));

app.post("/addUser", async (req, res) => {
    let vnome = req.body.name;
    let item = await new User({ name: vnome })
    // Comando do MongoDB
    item.save()
    .then(() => {
      console.log("Usuario adicionado com sucesso");
      res.send("Usuario adicionado com sucesso");
    })
    .catch((err) => {
      console.log("Erro ao adicionar usuario: " + err);
      res.send("Erro ao adicionar usuario: " + err);
    });
    console.log(item);
  }
);

app.get("/getUser", async (req, res) => {
  let users = await User.find();
  res.send(users);
  console.log(users);
  res.end();
})