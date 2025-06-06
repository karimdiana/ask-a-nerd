const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const config = require('../config');

let client = null;
let db = null;

async function getDB() {
    if (db) return db;
    
    try {
        client = new MongoClient(config.mongodb.uri);
        await client.connect();
        db = client.db("ask-a-nerd");
        return db;
    } catch (error) {
        throw new Error("Database connection failed");
    }
}

async function signUp(userData) {
    try {
        const database = await getDB();
        const users = database.collection("users");
        
        const existingUser = await users.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const result = await users.insertOne({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            createdAt: new Date(),
            userType: userData.userType || 'nerd'
        });
        
        return { success: true, userId: result.insertedId };
    } catch (error) {
        throw error;
    }
}

async function signIn(email, password) {
    try {
        const database = await getDB();
        const users = database.collection("users");
        
        const user = await users.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        
        const { password: _, ...userData } = user;
        return { success: true, user: userData };
    } catch (error) {
        throw error;
    }
}

async function cleanup() {
    if (client) {
        await client.close();
        client = null;
        db = null;
    }
}

module.exports = {
    signUp,
    signIn,
    cleanup
}; 