import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PAGE_ID = process.env.PAGE_ID;
const IG_ID = process.env.IG_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.post("/publicar", async (req, res) => {
  const { titulo, descricao, imagem } = req.body;

  try {
    // 🔹 Publicar no Facebook
    await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `${titulo}\n\n${descricao}`,
        access_token: ACCESS_TOKEN
      })
    });

    // 🔹 Criar mídia Instagram
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v19.0/${IG_ID}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imagem,
          caption: `${titulo}\n\n${descricao}`,
          access_token: ACCESS_TOKEN
        })
      }
    );

    const mediaData = await mediaResponse.json();

    // 🔹 Publicar no Instagram
    await fetch(
      `https://graph.facebook.com/v19.0/${IG_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: mediaData.id,
          access_token: ACCESS_TOKEN
        })
      }
    );

    res.json({ sucesso: true });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao publicar" });
  }
});

app.listen(3000, () => console.log("Servidor rodando"));