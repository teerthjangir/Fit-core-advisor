import mongoose from 'mongoose';
import User from './backend/models/User.js';

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fitcore');
  const users = await User.find({});
  console.log(JSON.stringify(users, null, 2));
  process.exit(0);
}
run();
