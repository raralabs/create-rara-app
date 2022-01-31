// inspired from extract-files npm
// inspired from apollo-upload-client
// Resources :

// ******
// https://github.com/jaydenseric/graphql-multipart-request-spec
// https://github.dev/jaydenseric/apollo-upload-client/blob/master/public/createUploadLink.js
// https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
// https://github.dev/jaydenseric/extract-files/blob/master/extractFiles.mjs
// *****

function isPlainObject(data: unknown): data is object {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(data);
  return prototype === null || prototype === Object.prototype;
}

const isExtractableFile = (data: unknown): data is File | Blob =>
  data instanceof File || data instanceof Blob;

function extractFiles<T>(data: T, prefix: string): Map<File | Blob, string[]> | null {
  const filesMap = new Map<File | Blob, string[]>();

  function recurse<T>(data: T, prefix: string) {
    if (isExtractableFile(data)) {
      const existingFilesInMap = filesMap.get(data);
      existingFilesInMap ? existingFilesInMap.push(prefix) : filesMap.set(data, [prefix]);
      return null;
    }

    prefix = prefix + '.';

    const isDataObject = isPlainObject(data);

    const isArray = Array.isArray(data);

    if (isArray) {
      data.forEach((file, index) => {
        const prefixedKey = prefix + index;
        recurse(file, prefixedKey);
      });
    }
    if (isDataObject) {
      const keysArray = Object.keys(data) as (keyof T)[];

      keysArray.forEach((key) => {
        const prefixedKey = prefix + key;
        const file = data[key];

        recurse(file, prefixedKey);
      });
    }
    return filesMap;
  }

  return recurse(data, prefix);
}

// type FileType = {
//   [key: string]: File | Blob | (File | Blob)[] | FileType;
// };

const hasFiles = (data: unknown) => !!extractFiles(data, 'variables')?.size;

// Todo maybe separate the logic to a different file
function getNewBodyForUpload(variables: unknown, query: string) {
  if (!variables) return null;
  const map: { [key: number]: string[] } = {};
  const form: { [key: number]: File | Blob } = {};
  const formData = new FormData();

  const extractedMap = extractFiles(variables, 'variables');

  let i = 0;
  extractedMap?.forEach((path, file) => {
    map[i] = path;
    form[i] = file;
    formData.set(i.toString(), file);
    i++;
  });
  formData.set('map', JSON.stringify(map));
  formData.append('operations', JSON.stringify({ query, variables }));
  return formData;
}

export { getNewBodyForUpload, hasFiles };
