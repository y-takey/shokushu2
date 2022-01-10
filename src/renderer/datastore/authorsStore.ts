const condition = {
  docType: "authors",
};

// type Record = {
//   docType: "authors",
//   value: Array<string>
// }

const find = async () => {
  const [doc] = await window.shokushu2API.db.find(condition);

  return doc ? doc.values : [];
};

const update = async (values: Array<string>) => {
  await window.shokushu2API.db.update(condition, { values });
};

export { find, update };
