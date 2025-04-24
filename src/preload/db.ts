import { ipcRenderer } from "electron";

import { Sorter, Pager, IShokushu2API } from "~/types/api";

const api: IShokushu2API["db"] = {
  paginate: async (query, sorter: Sorter | Array<Sorter>, pager: Pager) => {
    return ipcRenderer.invoke("db_paginate", query, sorter, pager);
  },
  count: async (conditions) => {
    return ipcRenderer.invoke("db_count", conditions);
  },
  find: async (conditions) => {
    return ipcRenderer.invoke("db_find", conditions);
  },
  insert: async (attributes) => {
    return ipcRenderer.invoke("db_insert", attributes);
  },
  update: async (conditions, attributes) => {
    return ipcRenderer.invoke("db_update", conditions, attributes);
  },
  delete: async (conditions) => {
    return ipcRenderer.invoke("db_remove", conditions);
  },
};

export default api;
