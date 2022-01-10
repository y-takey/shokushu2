const path = require("path");
const { app } = require("electron");
const Datastore = require("nedb");

import { Sorter, Pager } from "../types";

const filename =
  process.env.NODE_ENV === "development" ? "./data.db" : path.join(app.getPath("appData"), "shokushu2", "data.db");

const db = new Datastore({
  filename,
  autoload: true,
});

// compacting per 10s
db.persistence.setAutocompactionInterval(10 * 1000);

const asyncDb = (funcName: string, ...params: any): Promise<any> =>
  new Promise((resolve, reject) => {
    db[funcName](...params, (err, ...result) => {
      err ? reject(err) : resolve(result);
    });
  });

const paginate = (query, sorter: Sorter | Array<Sorter>, pager: Pager): Promise<any[]> => {
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

const count = (query): Promise<number> =>
  new Promise((resolve, reject) => {
    db.count(query).exec((err, count) => {
      err ? reject(err) : resolve(count);
    });
  });

const find = async (conditions) => {
  return asyncDb("findOne", conditions);
};

const insert = async (attributes) => {
  return asyncDb("insert", [attributes]);
};

const update = async (conditions, attributes) => {
  return asyncDb("update", conditions, { $set: attributes }, { upsert: true });
};

const remove = async (conditions) => {
  return asyncDb("remove", conditions);
};

const api = {
  filename,
  paginate,
  count,
  find,
  insert,
  update,
  delete: remove,
};

export default api;
