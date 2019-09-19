const files = require('./files');
const shortid = require('shortid');
const path = require('path');


class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }


  save(object) {
    async() => {
      object.id = shortid.generate();
      JSON.stringify(object);
      const filePath = path.join(this.folder, `${object.id}.json`);
      try {
        const returnedObject = await files.writeFile(filePath, object);
        return returnedObject;
      }
      catch(err) {
        console.log(err);
      }
  
    };
  }

  get(id) {
    async() => {
      const filePath = path.join(this.folder, `${id}.json`);
      try {
        const object = await files.readFile(filePath);
        return JSON.parse(object);
      }
      catch(err) {
        console.log(err);
      }
    };
  }

  
  getAll() {
    async() => {
      try {
        const fileNames = await files.readdir(this.folder);

        fileNames.map(file => {
          const id = path.parse(file).name;
          return this.get(id);
        });
      }
      catch(err) {
        console.log(err);
      }
    };
  }
}

module.exports = DocumentCollection;