import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  medicalConditions: [{
    type: String
  }],
  medications: [{
    type: String
  }],
  weeklyPlan: {
    type: Object,
    default: {}
  },
  gymPlan: {
    type: Object,
    default: {}
  },
  bodyGoal: {
    type: String
  },
  healthScore: {
    type: Number,
    default: 0,
  },
  dailyLogs: [{
    day: String,
    score: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
