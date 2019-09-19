const files = require('./files');
const shortid = require('shortid');
const path = require('path');


class DocumentCollectionAsync {
  constructor(folder) {
    this.folder = folder;
  }


  async save(object) {
    object.id = shortid.generate();
    const newObject = JSON.stringify(object);
    const filePath = path.join(this.folder, `${object.id}.json`);
    try {
      await files.writeFile(filePath, newObject);
      return object;
    }
    catch(err) {
      console.log(err);
    }
  }

  async get(id) {
    const filePath = path.join(this.folder, `${id}.json`);
    try {
      const object = await files.readFile(filePath);
      return JSON.parse(object);
    }
    catch(err) {
      console.log(err);
    }
  }

  
  async getAll() {
    try {
      const fileNames = await files.readdir(this.folder);

      return await Promise.all(fileNames.map(async(file) => {
        const id = path.parse(file).name;
        return await this.get(id);
      }));
    }
    catch(err) {
      console.log(err);
    }
  }
}

module.exports = DocumentCollectionAsync;