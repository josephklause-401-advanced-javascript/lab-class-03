jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

const path = require('path');

const DocumentCollection = require('../lib/document-collection');

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');

describe('Document Collection', () => {


  it('saves object to folder', () => {
    const folder = 'dest.txt';
    const docCollection = new DocumentCollection(folder);
    const object = {
      person: 'joe'
    };

    writeFile.mockResolvedValueOnce(object);

    return docCollection.save(object)
      .then(obj => {
  
        const writeCalls = writeFile.mock.calls;

        expect(path.dirname(writeCalls[0][0])).toBe(folder);
        expect(writeCalls[0][1]).toBe(JSON.stringify(obj));
        expect(obj.id).toEqual(expect.any(String));
      });
  });


  it('gets object from folder by id', () => {
    const folder = 'dest.txt';
    const docCollection = new DocumentCollection(folder);
    const expectedObject = {
      person: 'joe',
      id: 'jlk'
    };

    readFile.mockResolvedValueOnce(JSON.stringify(expectedObject));

    return docCollection.get(expectedObject.id)
      .then(returnedObj => {
        const readCalls = readFile.mock.calls;

        expect(readCalls.length).toBe(1); 
        expect(path.dirname(readCalls[0][0])).toBe(folder);
        expect(returnedObj).toEqual(expectedObject);
      });
  });

  
  it('gets all objects from folder', () => {

    const folder = 'dest.txt';
    const docCollection = new DocumentCollection(folder);
    const expectedObject = {
      person: 'joe',
      id: 'jlk'
    };

    readdir.mockResolvedValueOnce(['jlk.json']);
    readFile.mockResolvedValueOnce(JSON.stringify(expectedObject));
    
    return docCollection.getAll()
      .then(returnArray => {
        const readdirCalls = readdir.mock.calls;
        const readCalls = readFile.mock.calls;

        expect(readdirCalls[0][0]).toBe(folder);
        expect(readCalls[0][0]).toBe(`${folder}/${expectedObject.id}.json`);
        expect(returnArray[0].id).toBe(expectedObject.id);
      });
  });
});