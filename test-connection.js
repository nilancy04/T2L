const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://na4701:NePaSAkyHC0DdSIn@cluster0.8bbydat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    // Test database operations
    const db = client.db('consultantDB');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));

    // Test creating a collection
    await db.createCollection('test');
    console.log("Successfully created 'test' collection");

    // Insert a test document
    const result = await db.collection('test').insertOne({
      test: "Hello MongoDB!",
      timestamp: new Date()
    });
    console.log("Successfully inserted test document:", result.insertedId);

    // Clean up - remove test collection
    await db.collection('test').drop();
    console.log("Successfully cleaned up test collection");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed");
  }
}

// Run the test
testConnection().catch(console.error); 