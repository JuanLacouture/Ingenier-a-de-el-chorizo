// server/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // permitir peticiones del front
app.use(express.json()); // parsear JSON

// Healthcheck / prueba
app.get("/api/health", (req, res) => {
  res.json({ ok: true, msg: "API Arepabuelas funcionando 🍳" });
});

// Aquí más adelante irán tus rutas reales (login, etc.)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));
