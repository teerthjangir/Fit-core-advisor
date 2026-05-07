/* global use, db */
// MongoDB Playground for FitCore Advisor - Full Database Setup

use('fitcore');

// 1. USERS COLLECTION (Fully Populated)
db.getCollection('users').insertMany([
  {
    "email": "pro.user@example.com",
    "name": "Rahul Verma",
    "googleId": "300030003000",
    "picture": "https://example.com/avatar3.jpg",
    "medicalConditions": ["Hypertension"],
    "medications": ["Amlodipine"],
    "age": 35,
    "gender": "Male",
    "height": 180,
    "weight": 85,
    "activityLevel": "Active",
    "sleepHours": 8,
    "stressLevel": "Medium",
    "primaryGoal": "Weight Loss",
    "dietaryPreference": "Vegan",
    "wantGymAdvice": "Yes",
    "bodyGoal": "Lean & Muscular",
    "exerciseFrequency": "5-6 times a week",
    "waterIntake": "3-4 Liters",
    "dietQuality": "Excellent",
    "waistCircumference": 34,
    "previousAttempts": "Tried Keto, gained it back",
    "healthScore": 90,
    "dailyLogs": [
      { "day": "Assessment", "score": 85, "date": new Date("2024-01-01") },
      { "day": "Day 1", "score": 88, "date": new Date("2024-01-02") },
      { "day": "Day 2", "score": 90, "date": new Date("2024-01-03") }
    ],
    "weeklyPlan": {
      "monday": { "breakfast": "Oats with berries", "lunch": "Tofu Salad", "dinner": "Lentil Soup" },
      "tuesday": { "breakfast": "Vegan Smoothie", "lunch": "Quinoa Bowl", "dinner": "Grilled Seitan" }
    },
    "gymPlan": {
      "pushDay": ["Bench Press 3x10", "Shoulder Press 3x12", "Tricep Pushdown 3x15"],
      "pullDay": ["Pull-ups 3x8", "Barbell Row 3x10", "Bicep Curls 3x12"],
      "legDay": ["Squats 3x10", "Leg Press 3x12", "Calf Raises 4x15"]
    },
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]);

// 2. EXERCISES COLLECTION (Standard Exercises Database)
db.getCollection('exercises').insertMany([
  {
    "name": "Barbell Bench Press",
    "muscleGroup": "Chest",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Lie on bench, lower bar to mid-chest, press up.",
    "caloriesBurnedPerMinute": 5
  },
  {
    "name": "Bodyweight Squat",
    "muscleGroup": "Legs",
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": "Stand shoulder-width apart, lower hips until thighs are parallel to floor.",
    "caloriesBurnedPerMinute": 7
  },
  {
    "name": "Pull-up",
    "muscleGroup": "Back",
    "equipment": "Pull-up Bar",
    "difficulty": "Advanced",
    "instructions": "Hang from bar, pull body up until chin is over the bar.",
    "caloriesBurnedPerMinute": 8
  }
]);

// 3. MEALS COLLECTION (Standard Food Database)
db.getCollection('meals').insertMany([
  {
    "name": "Grilled Chicken Breast",
    "category": "Non-Vegetarian",
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fats": 3.6,
    "servingSize": "100g"
  },
  {
    "name": "Lentil Soup (Dal)",
    "category": "Vegetarian",
    "calories": 116,
    "protein": 9,
    "carbs": 20,
    "fats": 0.4,
    "servingSize": "100g"
  },
  {
    "name": "Oatmeal with Almonds",
    "category": "Vegan",
    "calories": 150,
    "protein": 5,
    "carbs": 27,
    "fats": 3,
    "servingSize": "1 bowl"
  }
]);

// Queries to verify data insertion
const userCount = db.getCollection('users').countDocuments();
const exerciseCount = db.getCollection('exercises').countDocuments();
const mealCount = db.getCollection('meals').countDocuments();

console.log(`Database Seeded Successfully!`);
console.log(`- Users: ${userCount}`);
console.log(`- Exercises: ${exerciseCount}`);
console.log(`- Meals: ${mealCount}`);
