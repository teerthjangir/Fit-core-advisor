import mongoose from 'mongoose';
import User from './models/User.js';

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fitcore');
  await User.updateMany({}, { $unset: { weeklyPlan: "" } });
  console.log("Wiped all weekly plans");
  process.exit(0);
}
run();
