const express = require("express");
const app = express();
const port = 5050;
require("dotenv").config();

const firebase = require("firebase");
const db = firebase
  .initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDERID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  })
  .firestore();

app.get("/", (req, res) => {
  res.send({ message: "Welcome to My Dragons' Book API!" });
});

app.get("/api/dragons", async (req, res) => {
  const dragons = db.collection("dragons").get();

  res.send((await dragons).docs.map((dragon) => dragon.data()));
});

app.get("/api/dragons/:name", async (req, res) => {
  const dragons = db
    .collection("dragons")
    .where("name", "==", req.params.name)
    .get();

  res.send((await dragons).docs.map((dragon) => dragon.data()));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
