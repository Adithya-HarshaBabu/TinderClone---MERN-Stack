import express from "express";
import mongoose from "mongoose";
import Cards from "./dBCards.js";
import Cors from "cors";

//!App Config

const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://Admin:Amaterasu14@cluster0.czp0h.mongodb.net/Tinder-dB?retryWrites=true&w=majority`;

//!Middleware
app.use(express.json());
app.use(Cors());

//!DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//!API Endpoint

app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/card", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//!Listener

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
