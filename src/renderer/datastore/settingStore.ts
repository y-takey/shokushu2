const docType = "setting";
const defaultSetting = {
  docType,
  videoDir: "",
  comicDir: "",
};

const insert = async (attrs: Record<string, any>) => {
  const [docs] = await window.shokushu2API.db.insert(attrs);
  return docs[0];
};

const findOne = async () => {
  const doc = await window.shokushu2API.db.find({ docType });
  if (doc) return doc;

  const newDoc = await insert(defaultSetting);

  return newDoc;
};

const update = async (attrs: Record<string, any>) => {
  const { _id } = await findOne();

  await window.shokushu2API.db.update({ _id }, attrs);
};

export { findOne, update };
