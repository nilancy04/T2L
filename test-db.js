require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const https = require('https');

async function getCurrentIP() {
  return new Promise((resolve, reject) => {
    https.get('https://api.ipify.org?format=json', (resp) => {
      let data = '';
      resp.on('data', (chunk) => { data += chunk; });
      resp.on('end', () => {
        try {
          const ip = JSON.parse(data).ip;
          console.log('Your current IP address:', ip);
          console.log('Make sure to add this IP to MongoDB Atlas Network Access whitelist');
          resolve(ip);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function testConnection() {
  try {
    // Get current IP first
    await getCurrentIP();
    
    // Test MongoDB connection
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not set in .env.local file');
    }

    // Extract username and password from connection string
    const credentials = uri.match(/mongodb\+srv:\/\/(.*?):(.*?)@/);
    if (credentials) {
      console.log('MongoDB Username:', credentials[1]);
      console.log('Password is set (verify it matches your MongoDB Atlas credentials)');
    }

    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB!');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testConnection();