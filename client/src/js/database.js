import { openDB } from 'idb';

//initialize and update version of jate database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//.put() method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.log('PUT function:putDb');
  //connection to the database database, version
  const jateDb = await openDB('jate', 1)  
  //new database transaction, privileges
  const tx = jateDb.transaction('jate', 'readwrite');  
  //open object store
  const store = tx.objectStore('jate');
  //put passed in data into database content
  const request = store.put({ content: content });
};

//method that gets all the content from the database
export const getDb = async () => {
  // console.log('GET function:getDb');
  //connection to the database database, version
  const jateDb = await openDB('jate', 1);
  //new database transaction, privileges
  const tx = jateDb.transaction('jate', 'readonly');
  //open object store
  const store = tx.objectStore('jate');
  // .getAll() to get all data in the database
  const request = store.getAll();
  //confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.content;
};
initdb();
