const { connectToMongoDB, getDB } = require("./MongoDBConfig");

describe("MongoDB Connection", () => {
  let db;
  let client;

  beforeAll(async () => {
    await connectToMongoDB();
    db = getDB();
    client = db.client;
  });

  afterAll(async () => {
    await client.close(); // Close the MongoDB connection
  });

  it("should connect to MongoDB successfully", () => {
    expect(db).toBeDefined();
  });

  it("should fetch data from the database", async () => {
    const collectionName = "Upcoming_Matches_10_Days"; // Replace "your-collection" with the actual collection name
    const collection = db.collection(collectionName);

    const data = await collection.findOne({ /* Your query criteria */ });
    expect(data).toBeTruthy();
  });
});
