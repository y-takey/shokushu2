import { join } from "path";
import { app, ipcMain } from "electron";
import { is } from "@electron-toolkit/utils";
import Datastore from "@seald-io/nedb";

import { Sorter, Pager } from "../types";

const filename = is.dev ? "./data.db" : join(app.getPath("appData"), "Shokushu2", "data.db");
let db: Datastore;

const setupDB = async () => {
  if (db) return;

  db = new Datastore({ filename, autoload: true });
  await db.loadDatabaseAsync();

  // compacting per 10s
  db.setAutocompactionInterval(10 * 1000);
};

ipcMain.handle("data_file_path", () => filename);

ipcMain.handle("db_paginate", async (_event, query, sorter: Sorter | Array<Sorter>, pager: Pager) => {
  await setupDB();

  const sortObj = (Array.isArray(sorter) ? sorter : [sorter]).reduce((accumulator, current) => {
    accumulator[current.key] = current.value === "asc" ? 1 : -1;
    return accumulator;
  }, {});

  const ret = await db
    .findAsync(query)
    .sort(sortObj)
    .skip((pager.current - 1) * pager.size)
    .limit(pager.size);

  return ret;
});

ipcMain.handle("db_count", async (_event, conditions) => {
  await setupDB();

  const ret = await db.countAsync(conditions);
  return ret;
});

ipcMain.handle("db_find", async (_event, conditions) => {
  await setupDB();

  const ret = await db.findOneAsync(conditions);
  return ret;
});

ipcMain.handle("db_insert", async (_event, attributes) => {
  await setupDB();

  const ret = await db.insertAsync([attributes]);
  return ret;
});

ipcMain.handle("db_update", async (_event, conditions, attributes) => {
  await setupDB();

  const ret = await db.updateAsync(conditions, { $set: attributes }, { upsert: true });
  return ret;
});

ipcMain.handle("db_remove", async (_event, conditions) => {
  await setupDB();

  const ret = await db.removeAsync(conditions, {});
  return ret;
});
