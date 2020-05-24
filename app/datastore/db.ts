import { Sorter, Pager, Media } from "~/types";

const { db, dataFilename } = window as any;

export const filename = dataFilename;

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
