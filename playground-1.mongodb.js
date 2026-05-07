/* global use, db */
// MongoDB Playground for FitCore Advisor

// Select the database to use.
use('fitcore');

// Insert a few sample users into the users collection.
db.getCollection('users').insertMany([
  {
    "email": "testuser1@example.com",
    "name": "Amit Sharma",
    "googleId": "100010001000",
    "picture": "https://example.com/avatar1.jpg",
    "medicalConditions": ["None"],
    "medications": ["None"],
    "age": 28,
    "gender": "Male",
    "height": 175,
    "weight": 70,
    "activityLevel": "Moderate",
    "sleepHours": 7,
    "stressLevel": "Low",
    "primaryGoal": "Build Muscle",
    "dietaryPreference": "Vegetarian",
    "wantGymAdvice": "Yes",
    "exerciseFrequency": "3-4 times a week",
    "waterIntake": "2-3 Liters",
    "dietQuality": "Good",
    "healthScore": 85,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "email": "testuser2@example.com",
    "name": "Priya Patel",
    "googleId": "200020002000",
    "picture": "https://example.com/avatar2.jpg",
    "medicalConditions": ["PCOS"],
    "medications": ["Metformin"],
    "age": 32,
    "gender": "Female",
    "height": 162,
    "weight": 65,
    "activityLevel": "Sedentary",
    "sleepHours": 6,
    "stressLevel": "High",
    "primaryGoal": "Weight Loss",
    "dietaryPreference": "Non-Vegetarian",
    "wantGymAdvice": "No",
    "exerciseFrequency": "Rarely",
    "waterIntake": "1-2 Liters",
    "dietQuality": "Average",
    "healthScore": 60,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]);

// Run a find command to view all users
const totalUsers = db.getCollection('users').find({}).count();

// Print a message to the output window.
console.log(`There are currently ${totalUsers} users in the database.`);

// Aggregate users by their primary goal
db.getCollection('users').aggregate([
  { $group: { _id: '$primaryGoal', count: { $sum: 1 } } }
]);
