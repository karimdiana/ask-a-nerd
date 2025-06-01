const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const config = require('../config');

let client = null;
let db = null;

async function getDB() {
    if (db) return db;
    
    try {
        console.log('Attempting to connect to MongoDB...');
        client = new MongoClient(config.mongodb.uri);
        await client.connect();
        console.log('Successfully connected to MongoDB');
        db = client.db("ask-a-nerd");
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
}

async function signUp(userData) {
    try {
        console.log('Starting signup process for:', userData.email);
        const database = await getDB();
        const users = database.collection("users");
        
        // Check if user already exists
        const existingUser = await users.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // Create user
        const result = await users.insertOne({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            createdAt: new Date(),
            userType: userData.userType || 'nerd'
        });
        
        console.log('User created successfully:', result.insertedId);
        return { success: true, userId: result.insertedId };
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}

async function signIn(email, password) {
    try {
        console.log('Starting signin process for:', email);
        const database = await getDB();
        const users = database.collection("users");
        
        // Find user
        const user = await users.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        
        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        
        // Return user data without password
        const { password: _, ...userData } = user;
        console.log('User signed in successfully:', userData._id);
        return { success: true, user: userData };
    } catch (error) {
        console.error('Signin error:', error);
        throw error;
    }
}

// Cleanup function to close the MongoDB connection
async function cleanup() {
    if (client) {
        await client.close();
        client = null;
        db = null;
    }
}

// Handle process termination
process.on('SIGINT', async () => {
    await cleanup();
    process.exit(0);
});

module.exports = {
    signUp,
    signIn,
    cleanup
}; 