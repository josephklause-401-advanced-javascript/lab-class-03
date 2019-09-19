const files = require('./files');
const shortid = require('shortid');
const path = require('path');


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

    return files.readdir(this.folder)
      .then(fileNames => {

        return Promise.all(fileNames.map(file => {

          const id = path.parse(file).name;
          return this.get(id);
          
        }));
      });
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}

module.exports = DocumentCollection;