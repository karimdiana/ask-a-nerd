const { MongoClient } = require('mongodb');
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

async function getUserProfile(userId) {
    try {
        const database = await getDB();
        const users = database.collection("users");
        
        const user = await users.findOne({ _id: userId });
        if (!user) {
            throw new Error("User not found");
        }
        
        // Return user data without sensitive information
        const { password, ...userData } = user;
        return userData;
    } catch (error) {
        console.error('Get user profile error:', error);
        throw error;
    }
}

async function updateUserCategories(userId, categories) {
    try {
        const database = await getDB();
        const users = database.collection("users");
        
        const result = await users.updateOne(
            { _id: userId },
            { $set: { categories: categories } }
        );
        
        if (result.matchedCount === 0) {
            throw new Error("User not found");
        }
        
        return { success: true };
    } catch (error) {
        console.error('Update user categories error:', error);
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

module.exports = {
    getUserProfile,
    updateUserCategories,
    cleanup
}; 