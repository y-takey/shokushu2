import { ipcRenderer } from "electron";
import Datastore from "nedb";

import { Sorter, Pager } from "../types";

let db;

const setupDB = async () => {
  if (db) return;

  const filename = await ipcRenderer.invoke("data_file_path");
  db = new Datastore({
    filename,
    autoload: true,
  });

  // compacting per 10s
  db.persistence.setAutocompactionInterval(10 * 1000);
};

const asyncDb = async (funcName: string, ...params: any): Promise<any> => {
  await setupDB();

  return new Promise((resolve, reject) => {
    db[funcName](...params, (err, ...result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

const paginate = async (query, sorter: Sorter | Array<Sorter>, pager: Pager): Promise<any[]> => {
  await setupDB();

  const sortObj = (Array.isArray(sorter) ? sorter : [sorter]).reduce((accumulator, current) => {
    accumulator[current.key] = current.value === "asc" ? 1 : -1;
    return accumulator;
  }, {});

  return new Promise((resolve, reject) => {
    db.find(query)
      .sort(sortObj)
      .skip((pager.current - 1) * pager.size)
      .limit(pager.size)
      .exec((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  });
};

const count = async (query): Promise<number> => {
  await setupDB();

  return new Promise((resolve, reject) => {
    db.count(query).exec((err, countNum) => {
      err ? reject(err) : resolve(countNum);
    });
  });
};

const find = async (conditions) => asyncDb("findOne", conditions);

const insert = async (attributes) => asyncDb("insert", [attributes]);

const update = async (conditions, attributes) => asyncDb("update", conditions, { $set: attributes }, { upsert: true });

const remove = async (conditions) => asyncDb("remove", conditions);

const api = {
  paginate,
  count,
  find,
  insert,
  update,
  delete: remove,
};

export default api;
