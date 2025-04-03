import { MediaType } from "./media";

export type Sorter = {
  key: string;
  value: "asc" | "desc";
};

export type Pager = {
  current: number;
  size: number;
};

// Dir
// > path.parse("/path/to/foo")
// # => { root: '/', dir: '/path/to', base: 'foo', ext: '', name: 'foo' }

// File
// > path.parse("/path/to/bar.jpg")
// # => { root: '/', dir: '/path/to', base: 'bar.jpg', ext: '.jpg', name: 'bar' }
export type PathStructure = {
  path: string;
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
  createdAt?: string;
};

interface IDB {
  paginate: (query, sorter: Sorter | Array<Sorter>, pager: Pager) => Promise<any[]>;
  count: (query) => Promise<number>;
  find: (conditions) => Promise<any[]>;
  insert: (attributes) => Promise<any>;
  update: (conditions, attributes) => Promise<any>;
  delete: (conditions) => Promise<any>;
}

interface IStorage {
  getDirs: (dirPath: string) => PathStructure[];
  getFiles: (dirPath: string, targetMedia?: MediaType) => PathStructure[];
  move: (currentPath: string, homePath: string, subDir: string, newName: string) => string;
  remove: (targetPath: string) => void;
  copy: (src: string, homePath: string, name: string) => string;
  parsePathStructure: (fullPath: string) => PathStructure;
  getModifiedDate: (targetPath: string) => Date;
}

export interface IShokushu2API {
  filename: () => Promise<string>;
  dialog: {
    showOpenDialogSync: (params: any) => string[];
  };
  db: IDB;
  storage: IStorage;
  openMediaDir: (mediaType: MediaType, mediaPath: string) => void;
  copyMediaFolderPath: (mediaType: MediaType, mediaPath: string) => void;
}
