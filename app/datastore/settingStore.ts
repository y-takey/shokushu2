import db from "./db";

const docType = "setting";
const defaultSetting = {
  docType,
  videoDir: "",
  comicDir: "",
};

const insert = async (attrs: Record<string, any>) => {
  const [docs] = await db("insert", [attrs]);
  return docs[0];
};

const findOne = async () => {
  const [doc] = await db("findOne", {
    docType,
  });
  if (doc) return doc;

  const newDoc = await insert(defaultSetting);

  return newDoc;
};

const update = async (attrs: Record<string, any>) => {
  const { _id } = await findOne();

  await db(
    "update",
    {
      _id,
    },
    {
      $set: attrs,
    }
  );
};

export { findOne, update };
