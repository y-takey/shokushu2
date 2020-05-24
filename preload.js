/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const electron = require("electron");
const Datastore = require("nedb");

const { app } = electron.remote;
const filename =
  process.env.NODE_ENV === "development" ? "./data.db" : path.join(app.getPath("appData"), "shokushu2", "data.db");

const db = new Datastore({
  filename,
  autoload: true,
});

// compacting per 10s
db.persistence.setAutocompactionInterval(10 * 1000);

process.once("loaded", () => {
  global.db = db;
  global.dataFilename = filename;
});
