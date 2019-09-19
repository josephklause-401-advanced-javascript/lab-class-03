const files = require('./files');
const shortid = require('shortid');
const path = require('path');


class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }


  save(object) {
    object.id = shortid.generate();
    const newObject = JSON.stringify(object);

    const filePath = path.join(this.folder, `${object.id}.json`);

    return files.writeFile(filePath, newObject)
      .then(() => {

        return object;

      })
      .catch(err => { console.log(err); });
  }


  get(id) {
    const filePath = path.join(this.folder, `${id}.json`);

    return files.readFile(filePath)
      .then(object => {
        return JSON.parse(object);

      })
      .catch(err => { console.log(err); });
  }

  
  getAll() {
    return files.readdir(this.folder)
      .then(fileNames => {

        return Promise.all(fileNames.map(file => {

          const id = path.parse(file).name;
          return this.get(id);

        }))
          .catch(err => { console.log(err); });
      });
  }
}

module.exports = DocumentCollection;