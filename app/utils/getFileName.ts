const getFileName = (filePath: string) => filePath && filePath.split("/").slice(-1)[0];

export default getFileName;
