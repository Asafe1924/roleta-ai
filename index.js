const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let historico = [];

function prever() {
  if (historico.length < 5) return "Aguardando dados...";

  let soma = historico.reduce((a, b) => a + Number(b), 0);
  let media = Math.round(soma / historico.length);

  return "Possível tendência próxima de: " + media;
}

app.post("/numero", (req, res) => {
  const { numero } = req.body;

  historico.push(Number(numero));
  if (historico.length > 50) historico.shift();

  res.json({
    historico,
    previsao: prever()
  });
});

app.get("/dados", (req, res) => {
  res.json({
    historico,
    previsao: prever()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando 🚀");
});
