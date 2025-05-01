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
  res.json({ message: "Server is running" });
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

let LamenSchema = new mongoose.Schema({
  nome: String,
  ingredientes: [String],
  valor: Number,
});

let Lamen = mongoose.model("Lamen", LamenSchema);

app.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let i = await User.findByIdAndDelete(id);
  if (i) {
    res.send({ status: "Deletado" });
  } else {
    res.send({ status: "Erro ao deletar" });
  }
});

app.post("/addLamen", async (req, res) => {
  try {
    const { nome, ingredientes, valor } = req.body;

    if (
      !nome ||
      !ingredientes ||
      !Array.isArray(ingredientes) ||
      valor === undefined
    ) {
      return res.status(400).json({
        status: "error",
        message: "Dados inválidos. Forneça nome, ingredientes (array) e valor",
      });
    }

    let novoLamen = new Lamen({
      nome,
      ingredientes,
      valor: Number(valor),
    });

    await novoLamen.save();
    console.log("Lamen adicionado com sucesso:", novoLamen);
    res.status(201).json({
      status: "ok",
      message: "Lamen adicionado com sucesso",
      data: novoLamen,
    });
  } catch (err) {
    console.log("Erro ao adicionar lamen:", err);
    res
      .status(500)
      .json({ status: "error", message: "Erro ao adicionar lamen" });
  }
});

app.get("/getLamen", async (req, res) => {
  try {
    let lamens = await Lamen.find({});
    res.json(lamens);
    console.log("Lamens encontrados:", lamens.length);
  } catch (err) {
    console.log("Erro ao buscar lamens:", err);
    res.status(500).json({ status: "error", message: "Erro ao buscar lamens" });
  }
});

app.get("/getLamen/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let lamen = await Lamen.findById(id);

    if (lamen) {
      res.json(lamen);
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Lamen não encontrado" });
    }
  } catch (err) {
    console.log("Erro ao buscar lamen:", err);
    res.status(500).json({ status: "error", message: "Erro ao buscar lamen" });
  }
});

app.put("/updateLamen/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, ingredientes, valor } = req.body;

    if (
      (!nome && !ingredientes && valor === undefined) ||
      (ingredientes && !Array.isArray(ingredientes))
    ) {
      return res.status(400).json({
        status: "error",
        message: "Dados inválidos para atualização",
      });
    }

    const atualizacao = {};
    if (nome) atualizacao.nome = nome;
    if (ingredientes) atualizacao.ingredientes = ingredientes;
    if (valor !== undefined) atualizacao.valor = Number(valor);

    const lamen = await Lamen.findByIdAndUpdate(id, atualizacao, { new: true });

    if (lamen) {
      res.json({
        status: "ok",
        message: "Lamen atualizado com sucesso",
        data: lamen,
      });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Lamen não encontrado" });
    }
  } catch (err) {
    console.log("Erro ao atualizar lamen:", err);
    res
      .status(500)
      .json({ status: "error", message: "Erro ao atualizar lamen" });
  }
});

app.delete("/deleteLamen/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const lamen = await Lamen.findByIdAndDelete(id);

    if (lamen) {
      res.json({
        status: "ok",
        message: "Lamen deletado com sucesso",
      });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Lamen não encontrado" });
    }
  } catch (err) {
    console.log("Erro ao deletar lamen:", err);
    res.status(500).json({ status: "error", message: "Erro ao deletar lamen" });
  }
});
