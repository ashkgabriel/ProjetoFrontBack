let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

let app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

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
  let item = await new User({ name: vnome });
  // Comando do MongoDB
  item
    .save()
    .then(() => {
      console.log("Usuario adicionado com sucesso");
      res.send("Usuario adicionado com sucesso");
    })
    .catch((err) => {
      console.log("Erro ao adicionar usuario: " + err);
      res.send("Erro ao adicionar usuario: " + err);
    });
  console.log(item);
});

app.get("/getUser", async (req, res) => {
  let users = await User.find({});
  res.send(users);
  console.log(users);
  res.end();
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const dados = req.body.name;
  const user = await User.findByIdAndUpdate(id, dados);
  if (user) {
    res.send({ status: "ok", message: "Usuario atualizado com sucesso" });
  } else {
    res.send({ status: "error", message: "Usuario não encontrado" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let i = await User.findByIdAndDelete(id);
  if (i) {
    res.send({ status: "Deletado" });
  } else {
    res.send({ status: "Erro ao deletar" });
  }
});
