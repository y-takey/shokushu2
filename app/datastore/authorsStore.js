// @flow
import db from "./db";

const docType = "authors";

// type Record = {
//   docType: "authors",
//   value: Array<string>
// }

const find = async () => {
  const [doc] = await db("findOne", { docType });

  return doc ? doc.values : [];
};

const update = async (values: Array<string>) => {
  await db("update", { docType }, { $set: { values } }, { upsert: true });
};

export { find, update };
