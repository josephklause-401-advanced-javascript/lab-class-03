jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

const path = require('path')

const DocumentCollection = require('../lib/document-collection');

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');

describe('Document Collection', () => {

  it('saves file to path', () => {
    //arrange
    const folder = 'dest.txt';
    const docCollection = new DocumentCollection(folder);
    const object = {
      person: 'joe'
    };
    writeFile.mockResolvedValue(object);
    //act
    return docCollection.save(object)
      .then(obj => {
      //assert
        expect(obj.id).toEqual(expect.any(String));
        const writeCalls = writeFile.mock.calls;
        expect(path.dirname(writeCalls[0][0])).toBe(folder);
        expect(writeCalls[0][1]).toBe(object);
      });
  });

});