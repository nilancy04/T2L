import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = "mongodb+srv://na4701:NePaSAkyHC0DdSIn@cluster0.8bbydat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('consultantDB');
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      await client.close();
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await users.insertOne(newUser);
    await client.close();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
} 