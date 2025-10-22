const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    connectionString: "postgresql://postgres:dEauiYoZ8HL53esh@db.tmburfmgghlxolnbeeaj.supabase.co:5432/postgres?sslmode=require"
  });

  try {
    console.log('Testing PostgreSQL connection...');
    await client.connect();
    console.log('✅ Connected to PostgreSQL database!');
    
    const result = await client.query('SELECT version()');
    console.log('PostgreSQL version:', result.rows[0].version);
    
    // Test if we can create tables
    console.log('Testing table creation...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Table creation successful!');
    
    // Test insert
    await client.query('INSERT INTO test_table (name) VALUES ($1)', ['test']);
    console.log('✅ Insert successful!');
    
    // Test select
    const selectResult = await client.query('SELECT * FROM test_table');
    console.log('✅ Select successful! Data:', selectResult.rows);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('🔍 The database server is refusing connections.');
    } else if (error.code === 'ENOTFOUND') {
      console.log('🔍 Cannot resolve the database hostname.');
    } else if (error.code === '28000') {
      console.log('🔍 Authentication failed. Check username/password.');
    } else if (error.code === '3D000') {
      console.log('🔍 Database does not exist.');
    }
  } finally {
    await client.end();
  }
}

testConnection();
