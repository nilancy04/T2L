import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = "mongodb+srv://na4701:NePaSAkyHC0DdSIn@cluster0.8bbydat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('consultantDB');
    const users = db.collection('users');

    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      await client.close();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      await client.close();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await users.updateOne(
      { _id: user._id },
      { 
        $set: { lastLoginAt: new Date() },
        $push: { 
          signInHistory: {
            timestamp: new Date(),
            ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            userAgent: req.headers['user-agent']
          }
        }
      }
    );

    // Remove password from user object before sending
    const { password: _, ...userWithoutPassword } = user;

    await client.close();
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
} 