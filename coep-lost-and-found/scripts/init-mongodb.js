// This script runs automatically when MongoDB container starts
// It creates the application user and collections

db = db.getSiblingDB('coep-lost-found');

// Create application user with read/write permissions
db.createUser({
  user: 'app_user',
  pwd: 'app_password123',
  roles: [
    {
      role: 'readWrite',
      db: 'coep-lost-found'
    }
  ]
});

// Create collections
db.createCollection('foundItems');
db.createCollection('lostItems');

// Create indexes
db.foundItems.createIndex({ createdAt: -1 });
db.lostItems.createIndex({ createdAt: -1 });

print('✅ MongoDB initialization completed successfully!');
print('✅ Created collections: foundItems, lostItems');
print('✅ Created user: app_user');
