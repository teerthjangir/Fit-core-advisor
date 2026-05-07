import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import User from './models/User.js';

dotenv.config();

const app = express();
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "1089617758648-6frjuip8u45hokusvih77crerbn2qgl9.apps.googleusercontent.com");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with caching for serverless environments
let conn = null;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitcore';

const connectDB = async () => {
  if (conn) return conn;
  
  try {
    conn = await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return conn;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Routes - We use router instead of app for serverless
router.post('/auth/google', async (req, res) => {
  try {
    await connectDB();
    const { access_token } = req.body;
    
    // Fetch user info using the access token
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    
    if (!userInfoRes.ok) {
      throw new Error('Failed to fetch user info from Google');
    }
    
    const payload = await userInfoRes.json();
    const { sub: googleId, email, name, picture } = payload;
    
    // Check if user exists, else create
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({
        googleId,
        email,
        name,
        picture,
        dailyLogs: [{ day: 'Start', score: 0 }]
      });
      await user.save();
    }
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Auth Error:', error);
    if (error.name === 'MongooseServerSelectionError') {
      res.status(500).json({ success: false, message: 'Database connection failed. Please check your MongoDB Atlas IP whitelist.' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid token or authentication failed' });
    }
  }
});

router.post('/assessment', async (req, res) => {
  try {
    await connectDB();
    const { userId, formData, score } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Determine if it's an initial assessment or daily check-in
    const isAssessment = formData.activityLevel !== undefined;
    const dayLabel = isAssessment ? 'Assessment' : `Day ${user.dailyLogs.length}`;

    const assessmentFields = [
      'age', 'gender', 'height', 'weight', 'activityLevel', 
      'sleepHours', 'stressLevel', 'primaryGoal', 'dietaryPreference', 
      'wantGymAdvice', 'bodyGoal', 'exerciseFrequency', 'waterIntake', 
      'dietQuality', 'waistCircumference', 'previousAttempts'
    ];
    
    assessmentFields.forEach(field => {
      if (formData[field] !== undefined) {
        user[field] = formData[field];
      }
    });

    if (formData.medicalConditions !== undefined) {
      user.medicalConditions = formData.medicalConditions.split(',').map(c => c.trim()).filter(c => c);
    }
    if (formData.medications !== undefined) {
      user.medications = formData.medications.split(',').map(m => m.trim()).filter(m => m);
    }

    user.healthScore = score;
    user.dailyLogs.push({ day: dayLabel, score });
    await user.save();
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/medical', async (req, res) => {
  try {
    await connectDB();
    const { userId, medicalConditions, medications } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.medicalConditions = medicalConditions;
    user.medications = medications;
    await user.save();
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/user/mealplan', async (req, res) => {
  try {
    await connectDB();
    const { userId, weeklyPlan } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.weeklyPlan = weeklyPlan;
    await user.save();
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/user/bodygoal', async (req, res) => {
  try {
    await connectDB();
    const { userId, bodyGoal } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.bodyGoal = bodyGoal;
    await user.save();
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/user/gymplan', async (req, res) => {
  try {
    await connectDB();
    const { userId, gymPlan } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.gymPlan = gymPlan;
    await user.save();
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Use the router - mount at /api (This handles /api/auth/google when deployed)
app.use('/api', router);

// Export the wrapped app for Netlify
export const handler = serverless(app);
