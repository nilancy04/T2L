require('dotenv').config({ path: '.env.local' });
const connectDB = require('./lib/mongodb');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password789',
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB using the existing connection utility
    await connectDB();
    console.log('Connected to MongoDB successfully!');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const saltRounds = 10;
    const seedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(seedUsers);
    console.log('Successfully seeded database with users:');
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Mongoose connection will be handled by the connection utility
    process.exit(0);
  }
}

seedDatabase().catch(console.error);
