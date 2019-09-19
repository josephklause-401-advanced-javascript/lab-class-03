const files = require('./files');
const shortid = require('shortid');
const path = require('path');
// use npm to find a module for creating ids

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }


  save(object) {
    object.id = shortid.generate();
    JSON.stringify(object);
    const filePath = path.join(this.folder, `${object.id}.json`);

    return files.writeFile(filePath, object)
      .then(() => {
        return object;
      });
    // 5. if expected, turn promisified fs errors into meaningful database errors
  }

  get(id) {
    const filePath = path.join(this.folder, `${id}.json`);
    return files.readFile(filePath)
      .then(object => {
        return JSON.parse(object);
      });

    // 5. if expected, turn promisified fs errors into meaningful database errors
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}

module.exports = DocumentCollection;