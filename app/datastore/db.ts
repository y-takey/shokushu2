import Datastore from "nedb";
import electron from "electron";
import * as path from "path";

import { Sorter, Pager, Media } from "~/types";

const app = electron.app || electron.remote.app;

export const filename =
  process.env.NODE_ENV === "development"
    ? "./data.db"
    : path.join(app.getPath("appData"), "shokushu2", "data.db");
// console.log("---- filename -----", filename);

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

asyncDb.paginate = (query, sorter: Sorter | Array<Sorter>, pager: Pager): Promise<Media[]> => {
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

asyncDb.count = (query): Promise<number> =>
  new Promise((resolve, reject) => {
    db.count(query).exec((err, count) => {
      err ? reject(err) : resolve(count);
    });
  });

export default asyncDb;
