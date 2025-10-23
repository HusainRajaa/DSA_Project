const { MongoClient } = require('mongodb');

async function initializeDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas successfully');

    const db = client.db();
    
    // Create collections if they don't exist
    const collections = ['foundItems', 'lostItems'];
    
    for (const collectionName of collections) {
      const collectionExists = await db.listCollections({ name: collectionName }).hasNext();
      
      if (!collectionExists) {
        await db.createCollection(collectionName);
        console.log(`✅ Created collection: ${collectionName}`);
        
        // Create index for createdAt field
        await db.collection(collectionName).createIndex({ createdAt: -1 });
        console.log(`✅ Created index on ${collectionName}.createdAt`);
      } else {
        console.log(`ℹ️ Collection already exists: ${collectionName}`);
      }
    }

    console.log('\n🎉 Database initialization completed successfully!');
    console.log('Collections ready: foundItems, lostItems');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

initializeDatabase();
