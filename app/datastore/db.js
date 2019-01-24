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

const asyncDb = (funcName, ...params) =>
  new Promise((resolve, reject) => {
    db[funcName](...params, (err, ...result) => {
      err ? reject(err) : resolve(result);
    });
  });

const defaultSetting = { docType: "setting", videoDir: "", comicDir: "" };

const settingCondition = { docType: "setting" };

const getSetting = async () => {
  const [doc] = await asyncDb("findOne", settingCondition);

  return doc || defaultSetting;
};

const updateSetting = async (attrs: Object) => {
  const [, affectedDocs] = await asyncDb(
    "update",
    settingCondition,
    { ...settingCondition, ...attrs },
    {
      upsert: true,
      returnUpdatedDocs: true,
    }
  );

  return affectedDocs;
};

export { getSetting, updateSetting };
