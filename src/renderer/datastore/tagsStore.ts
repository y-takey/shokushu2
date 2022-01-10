const docType = "tags";

// type Record = {
//   docType: "tags",
//   values: Array<string>
// }

const find = async () => {
  const [doc] = await window.shokushu2API.db.find({ docType });
  return doc ? doc.values : [];
};

const update = async (values: Array<string>) => {
  await window.shokushu2API.db.update({ docType }, { values });
};

export { find, update };
