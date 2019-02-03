// @flow
import Datastore from "nedb";

import electron from "electron";
import path from "path";

const app = electron.app || electron.remote.app;
const filename =
  process.env.NODE_ENV === "development"
    ? "./data.db"
    : path.join(app.getPath("appData"), "shokushu2");
// console.log("---- filename -----", filename);

const db = new Datastore({ filename, autoload: true });

// compacting per 10s
db.persistence.setAutocompactionInterval(10 * 1000);

const asyncDb = (funcName: string, ...params: any): Promise<any> =>
  new Promise((resolve, reject) => {
    db[funcName](...params, (err, ...result) => {
      err ? reject(err) : resolve(result);
    });
  });

asyncDb.paginate = (
  query,
  sorter: { key: string, value: "asc" | "desc" },
  pager: { current: number, size: number }
) =>
  new Promise((resolve, reject) => {
    db.find(query)
      .sort({ [sorter.key]: sorter.value === "asc" ? 1 : -1 })
      .skip((pager.current - 1) * pager.size)
      .limit(pager.size)
      .exec((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  });

asyncDb.count = query =>
  new Promise((resolve, reject) => {
    db.count(query).exec((err, count) => {
      err ? reject(err) : resolve(count);
    });
  });

export default asyncDb;
