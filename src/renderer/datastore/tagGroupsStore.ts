import { TagGroup } from "~/types";

const docType = "tag_groups";

// type Record = {
//   docType: "tag_groups";
//   values: TagGroup[];
// }

const find = async (): Promise<TagGroup[]> => {
  const [doc] = await window.shokushu2API.db.find({ docType });
  return doc ? doc.values : [];
};

const update = async (values: TagGroup[]) => {
  await window.shokushu2API.db.update({ docType }, { values });
};

export { find, update };
