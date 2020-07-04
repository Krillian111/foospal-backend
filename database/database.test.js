const { startDatabase, stopDatabase } = require('../test/test-database');

describe('TestDatabase', () => {
  let db;

  beforeAll(async () => {
    db = await startDatabase();
  });

  afterAll(async () => {
    await stopDatabase();
  });

  it('should insert a doc into collection', async () => {
    const testCollection = db.collection('test-collection');

    const id = 'some-object-id';
    const testObject = { _id: id, name: 'John' };
    await testCollection.insertOne(testObject);

    const insertedObject = await testCollection.findOne({ _id: id });
    expect(insertedObject).toEqual(testObject);
  });
});
