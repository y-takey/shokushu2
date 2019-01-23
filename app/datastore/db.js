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

const defaultSetting = { docType: "setting", videoDir: "", comicDir: "" };

const findOne = (db, options) =>
  new Promise((resolve, reject) => {
    db.findOne(options, (err, doc) => {
      err ? reject(err) : resolve(doc);
    });
  });

const update = (db, query, attrs, options) =>
  new Promise((resolve, reject) => {
    db.update(query, attrs, options, (err, doc) => {
      err ? reject(err) : resolve(doc);
    });
  });

const settingCondition = { docType: "setting" };

const getSetting = async () => {
  const doc = await findOne(db, settingCondition);

  return doc || defaultSetting;
};

const updateSetting = async (attrs: Object) => {
  const doc = await update(
    db,
    settingCondition,
    { ...settingCondition, ...attrs },
    {
      upsert: true,
      returnUpdatedDocs: true,
    }
  );

  return doc;
};

export { getSetting, updateSetting };
