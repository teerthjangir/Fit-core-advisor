import { useState } from 'react';
import { Search, Filter, Clock, Flame, Activity, PlayCircle, Calculator } from 'lucide-react';
import clsx from 'clsx';

export default function ExerciseLibrary({ currentUser, setCurrentUser }) {
  const [calcData, setCalcData] = useState({ activity: 'Running', duration: 30 });
  const [burnedCals, setBurnedCals] = useState(null);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(currentUser?.bodyGoal || 'Lean');
  const [isSavingGoal, setIsSavingGoal] = useState(false);

  const calculateCalories = () => {
    // MET values: Running = 9.8, Cycling = 7.5, Weightlifting = 3.5, Yoga = 2.5
    const metValues = { Running: 9.8, Cycling: 7.5, Weightlifting: 3.5, Yoga: 2.5 };
    const weightKg = currentUser?.weight || 70; // fallback to 70kg
    const durationHours = calcData.duration / 60;
    const cals = Math.round(metValues[calcData.activity] * weightKg * durationHours);
    setBurnedCals(cals);
  };

  const handleUpdateGoal = async () => {
    if (!currentUser) return;
    setIsSavingGoal(true);
    try {
      const res = await fetch('/api/user/bodygoal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, bodyGoal: newGoal })
      });
      const data = await res.json();
      if (data.success && setCurrentUser) {
        setCurrentUser(prev => ({ ...prev, bodyGoal: newGoal }));
        setIsEditingGoal(false);
      }
    } catch (err) {
      console.error('Failed to update body goal', err);
    } finally {
      setIsSavingGoal(false);
    }
  };
  const exercises = [
    { id: 1, title: 'Belly Fat Burner HIIT', category: 'HIIT', duration: '15 min', difficulty: 'Intermediate', calories: '250', muscles: 'Full Body', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80', diffColor: 'bg-yellow-500', youtubeUrl: 'https://www.youtube.com/results?search_query=15+min+belly+fat+burner+hiit+workout' },
    { id: 2, title: 'Core Strength Builder', category: 'Core', duration: '20 min', difficulty: 'Advanced', calories: '200', muscles: 'Abs & Obliques', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80', diffColor: 'bg-red-500', youtubeUrl: 'https://www.youtube.com/results?search_query=20+min+core+strength+builder+workout' },
    { id: 3, title: 'Morning Metabolism Boost', category: 'Cardio', duration: '10 min', difficulty: 'Beginner', calories: '120', muscles: 'Full Body', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', diffColor: 'bg-green-500', youtubeUrl: 'https://www.youtube.com/results?search_query=10+min+morning+metabolism+boost+workout' },
    { id: 4, title: 'Intense Ab Circuit', category: 'Strength', duration: '15 min', difficulty: 'Advanced', calories: '180', muscles: 'Core', img: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=600&q=80', diffColor: 'bg-red-500', youtubeUrl: 'https://www.youtube.com/results?search_query=15+min+intense+ab+circuit+workout' },
    { id: 5, title: 'Low Impact Fat Loss', category: 'Cardio', duration: '30 min', difficulty: 'Beginner', calories: '300', muscles: 'Lower Body & Core', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80', diffColor: 'bg-green-500', youtubeUrl: 'https://www.youtube.com/results?search_query=30+min+low+impact+fat+loss+workout' },
    { id: 6, title: 'Pilates For Flat Stomach', category: 'Mobility', duration: '25 min', difficulty: 'Intermediate', calories: '150', muscles: 'Core & Back', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80', diffColor: 'bg-yellow-500', youtubeUrl: 'https://www.youtube.com/results?search_query=25+min+pilates+for+flat+stomach' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Exercise Library</h1>
          <p className="text-slate-500">Discover workouts tailored to your fitness level and goals.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search exercises, categories, or muscles..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Personalized YouTube Suggestions */}
      {currentUser && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-6 rounded-2xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <PlayCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-slate-900">Personalized YouTube Suggestions</h2>
          </div>
          <p className="text-slate-600 mb-4 text-sm">Based on your profile, we've curated these search queries for you to explore on YouTube:</p>
          <div className="flex flex-wrap gap-3">
            <a href={`https://www.youtube.com/results?search_query=${currentUser.healthScore < 50 ? 'beginner' : 'intermediate'}+belly+fat+workout`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2">
              <Search className="w-4 h-4" /> {currentUser.healthScore < 50 ? 'Beginner' : 'Intermediate'} Belly Fat Workout
            </a>
            <a href={`https://www.youtube.com/results?search_query=15+min+${currentUser.medicalConditions?.includes('Joint Pain') ? 'low+impact' : 'hiit'}+workout`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2">
              <Search className="w-4 h-4" /> 15 Min {currentUser.medicalConditions?.includes('Joint Pain') ? 'Low Impact' : 'HIIT'} Workout
            </a>
            <a href={`https://www.youtube.com/results?search_query=${currentUser.dietaryPreference && currentUser.dietaryPreference !== 'None' ? currentUser.dietaryPreference : ''}+nutrition+for+fat+loss+tips`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2">
              <Search className="w-4 h-4" /> {currentUser.dietaryPreference && currentUser.dietaryPreference !== 'None' ? currentUser.dietaryPreference : ''} Nutrition for Fat Loss
            </a>
          </div>
        </div>
      )}

      {/* Gym Tips for Body Goal */}
      {currentUser?.bodyGoal && (
        <div className="glass-card p-6 mb-8 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Gym Tips for {currentUser.bodyGoal}
            </h2>
            <button 
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {isEditingGoal ? 'Cancel' : 'Edit Goal'}
            </button>
          </div>

          {isEditingGoal ? (
            <div className="flex gap-2 mb-4">
              <select 
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="p-2 border border-slate-200 rounded-lg flex-1"
              >
                <option value="Lean">Lean</option>
                <option value="Muscular">Muscular</option>
                <option value="Strength">Strength</option>
                <option value="Endurance">Endurance</option>
                <option value="Flexibility">Flexibility</option>
              </select>
              <button 
                onClick={handleUpdateGoal}
                disabled={isSavingGoal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSavingGoal ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <>
              {currentUser.bodyGoal === 'Lean' && (
                <p className="text-slate-600 text-sm">Focus on high repetitions (12-15 reps) with moderate weights. Keep rest periods short (30-45 seconds) to keep your heart rate up and maximize fat burning.</p>
              )}
              {currentUser.bodyGoal === 'Muscular' && (
                <p className="text-slate-600 text-sm">Focus on progressive overload with heavy weights and lower reps (6-10 reps). Ensure adequate rest between sets (90-120 seconds) to maximize muscle hypertrophy and eat a caloric surplus.</p>
              )}
              {currentUser.bodyGoal === 'Strength' && (
                <p className="text-slate-600 text-sm">Train with very heavy weights and low reps (1-5 reps). Rest for 3-5 minutes between sets. Focus on compound lifts like squats, deadlifts, and bench presses.</p>
              )}
              {currentUser.bodyGoal === 'Endurance' && (
                <p className="text-slate-600 text-sm">Combine steady-state cardio (running, cycling) with high-repetition strength training (15-20+ reps). Focus on circuit training and minimizing rest times to build stamina.</p>
              )}
              {currentUser.bodyGoal === 'Flexibility' && (
                <p className="text-slate-600 text-sm">Incorporate daily stretching, yoga, and mobility drills. Focus on holding deep stretches for 30-60 seconds and prioritizing full range of motion in all exercises.</p>
              )}
            </>
          )}
        </div>
      )}

      {/* Exercise Activity Calculator */}
      <div className="glass-card p-6 mb-8 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-600" />
          Exercise Activity Calculator
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Activity</label>
            <select 
              value={calcData.activity}
              onChange={(e) => setCalcData({...calcData, activity: e.target.value})}
              className="w-full p-3 border border-slate-200 rounded-xl bg-white"
            >
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Weightlifting">Weightlifting</option>
              <option value="Yoga">Yoga</option>
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
            <input 
              type="number" 
              value={calcData.duration}
              onChange={(e) => setCalcData({...calcData, duration: Number(e.target.value)})}
              className="w-full p-3 border border-slate-200 rounded-xl bg-white"
            />
          </div>
          <button 
            onClick={calculateCalories}
            className="w-full md:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
          >
            Calculate
          </button>
        </div>
        {burnedCals !== null && (
          <div className="mt-4 p-4 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-between">
            <span className="font-medium">Estimated Calories Burned:</span>
            <span className="text-xl font-bold flex items-center gap-1"><Flame className="w-5 h-5" /> {burnedCals} kcal</span>
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((ex) => (
          <div key={ex.id} className="glass-card overflow-hidden group flex flex-col">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={ex.img}
                alt={ex.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

              {/* Badges overlaid on image */}
              <div className="absolute top-3 right-3">
                <span className={clsx(
                  "px-3 py-1 text-xs font-bold text-white rounded-full shadow-md backdrop-blur-sm",
                  ex.diffColor
                )}>
                  {ex.difficulty}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white/90 text-sm font-medium">
                <Clock className="w-4 h-4" />
                {ex.duration}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1 block">
                  {ex.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {ex.title}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">{ex.calories}</span>
                  <span className="text-xs text-slate-400">kcal</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{ex.muscles}</span>
                  <span className="text-xs text-slate-400">muscles</span>
                </div>
              </div>

              <a
                href={ex.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-5 py-3 rounded-xl font-medium text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" /> Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
