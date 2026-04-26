import { useState, useMemo } from 'react';
import { Dumbbell, Activity, Calendar, Download, Save, CheckCircle2, PlayCircle, HeartPulse, Flame } from 'lucide-react';
import clsx from 'clsx';

export default function GymHub({ currentUser, setCurrentUser }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(currentUser?.bodyGoal || 'Lean');
  const [isSavingGoal, setIsSavingGoal] = useState(false);

  const workoutOptions = {
    Strength: [
      { id: 's1', name: 'Upper Body Push', duration: '45 min', intensity: 'High', type: 'Weights' },
      { id: 's2', name: 'Upper Body Pull', duration: '45 min', intensity: 'High', type: 'Weights' },
      { id: 's3', name: 'Lower Body Strength', duration: '50 min', intensity: 'Very High', type: 'Weights' },
      { id: 's4', name: 'Full Body Compound', duration: '60 min', intensity: 'Very High', type: 'Weights' }
    ],
    Cardio: [
      { id: 'c1', name: 'HIIT Sprints', duration: '20 min', intensity: 'Very High', type: 'Cardio' },
      { id: 'c2', name: 'Steady State Run', duration: '40 min', intensity: 'Moderate', type: 'Cardio' },
      { id: 'c3', name: 'Stairmaster Climb', duration: '30 min', intensity: 'High', type: 'Cardio' }
    ],
    Core: [
      { id: 'ab1', name: 'Intense Ab Circuit', duration: '15 min', intensity: 'High', type: 'Core' },
      { id: 'ab2', name: 'Core Stabilization', duration: '20 min', intensity: 'Moderate', type: 'Core' }
    ],
    Mobility: [
      { id: 'm1', name: 'Active Recovery Yoga', duration: '30 min', intensity: 'Low', type: 'Recovery' },
      { id: 'm2', name: 'Full Body Stretching', duration: '20 min', intensity: 'Low', type: 'Recovery' },
      { id: 'm3', name: 'Rest Day', duration: '0 min', intensity: 'None', type: 'Rest' }
    ]
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [activeDay, setActiveDay] = useState('Mon');

  const [gymPlan, setGymPlan] = useState(() => {
    if (currentUser?.gymPlan && Object.keys(currentUser.gymPlan).length > 0) {
      return currentUser.gymPlan;
    }
    const plan = {};
    days.forEach((day, index) => {
      // Create a default split: Push, Pull, Legs, Rest, Cardio, Core, Rest
      plan[day] = {
        Main: index % 7 === 0 ? workoutOptions.Strength[0] : 
              index % 7 === 1 ? workoutOptions.Strength[1] : 
              index % 7 === 2 ? workoutOptions.Strength[2] : 
              index % 7 === 3 ? workoutOptions.Mobility[2] : 
              index % 7 === 4 ? workoutOptions.Cardio[0] : 
              index % 7 === 5 ? workoutOptions.Core[0] : 
              workoutOptions.Mobility[0]
      };
    });
    return plan;
  });

  const selectedWorkout = gymPlan[activeDay];

  const handleSelect = (option) => {
    setGymPlan(prev => ({
      ...prev,
      [activeDay]: { Main: option }
    }));
  };

  const handleSavePlan = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/user/gymplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, gymPlan })
      });
      const data = await res.json();
      if (data.success && setCurrentUser) {
        setCurrentUser(prev => ({ ...prev, gymPlan }));
      }
    } catch (err) {
      console.error('Failed to save gym plan', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    let content = "FITCORE ADVISOR - WEEKLY GYM SCHEDULE\n\n";
    days.forEach(day => {
      content += `=== ${day.toUpperCase()} ===\n`;
      const workout = gymPlan[day].Main;
      content += `Workout: ${workout.name}\n`;
      content += `Duration: ${workout.duration} | Intensity: ${workout.intensity}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FitCore_Gym_Schedule.txt';
    a.click();
    URL.revokeObjectURL(url);
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

  const getYoutubeQuery = (workoutName) => {
    let base = workoutName.toLowerCase().replace(/ /g, '+');
    let goal = currentUser?.bodyGoal ? currentUser.bodyGoal.toLowerCase() : '';
    if (goal === 'lean') goal = 'fat+loss';
    if (goal === 'muscular') goal = 'hypertrophy';
    if (goal === 'endurance') goal = 'stamina';
    
    // Add dietary preference if relevant (more for nutrition, but maybe workout fuel)
    const diet = currentUser?.dietaryPreference && currentUser.dietaryPreference !== 'None' ? currentUser.dietaryPreference.toLowerCase() : '';
    
    return `https://www.youtube.com/results?search_query=${goal}+${base}+workout`;
  };

  const getTypeColors = (type) => {
    switch(type) {
      case 'Weights': return { border: 'border-blue-400', bg: 'bg-blue-50/50', text: 'text-blue-700' };
      case 'Cardio': return { border: 'border-orange-400', bg: 'bg-orange-50/50', text: 'text-orange-700' };
      case 'Core': return { border: 'border-red-400', bg: 'bg-red-50/50', text: 'text-red-700' };
      case 'Recovery': return { border: 'border-green-400', bg: 'bg-green-50/50', text: 'text-green-700' };
      case 'Rest': return { border: 'border-slate-400', bg: 'bg-slate-50', text: 'text-slate-700' };
      default: return { border: 'border-slate-400', bg: 'bg-slate-50', text: 'text-slate-700' };
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Gym Hub</h1>
        <p className="text-slate-500">Plan your weekly workouts tailored to your body goal.</p>
      </div>

      {/* Goal Settings Area */}
      <div className="glass-card p-6 border-l-4 border-blue-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Current Focus: {currentUser?.bodyGoal || 'Not Set'}
          </h2>
          <button 
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            {isEditingGoal ? 'Cancel' : 'Edit Goal'}
          </button>
        </div>

        {isEditingGoal ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="p-3 border border-slate-200 rounded-xl flex-1 bg-white"
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
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {isSavingGoal ? 'Saving...' : 'Save Focus'}
            </button>
          </div>
        ) : (
          <div className="text-slate-600 text-sm">
            {currentUser?.bodyGoal === 'Lean' && <p>Focus on high repetitions (12-15 reps) with moderate weights. Keep rest periods short (30-45 seconds) to keep your heart rate up and maximize fat burning.</p>}
            {currentUser?.bodyGoal === 'Muscular' && <p>Focus on progressive overload with heavy weights and lower reps (6-10 reps). Ensure adequate rest between sets (90-120 seconds) to maximize muscle hypertrophy and eat a caloric surplus.</p>}
            {currentUser?.bodyGoal === 'Strength' && <p>Train with very heavy weights and low reps (1-5 reps). Rest for 3-5 minutes between sets. Focus on compound lifts like squats, deadlifts, and bench presses.</p>}
            {currentUser?.bodyGoal === 'Endurance' && <p>Combine steady-state cardio (running, cycling) with high-repetition strength training (15-20+ reps). Focus on circuit training and minimizing rest times to build stamina.</p>}
            {currentUser?.bodyGoal === 'Flexibility' && <p>Incorporate daily stretching, yoga, and mobility drills. Focus on holding deep stretches for 30-60 seconds and prioritizing full range of motion in all exercises.</p>}
            {!currentUser?.bodyGoal && <p>Please select a body goal to receive tailored gym advice.</p>}
          </div>
        )}
      </div>

      {/* Customizable Calendar */}
      <section className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Weekly Training Split</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-medium text-sm transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Export Schedule
            </button>
            <button 
              onClick={handleSavePlan}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Plan'}
            </button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex gap-2 overflow-x-auto hide-scrollbar">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={clsx(
                "px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap",
                activeDay === day 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">{activeDay}'s Workout</h2>
          <div className="flex items-center gap-6 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 text-blue-700 font-bold px-2">
              <Activity className="w-5 h-5" />
              <span>{selectedWorkout.Main.duration}</span>
            </div>
            <div className="px-2 text-sm text-slate-600 border-l border-slate-200">
              Intensity: <span className="font-bold text-slate-800">{selectedWorkout.Main.intensity}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {/* Current Selection Highlight */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Dumbbell className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
                  {selectedWorkout.Main.type}
                </span>
                <h3 className="text-3xl font-bold mb-2">{selectedWorkout.Main.name}</h3>
                <p className="text-slate-300 mb-6">Duration: {selectedWorkout.Main.duration} | Intensity: {selectedWorkout.Main.intensity}</p>
                
                {selectedWorkout.Main.type !== 'Rest' && (
                  <a 
                    href={getYoutubeQuery(selectedWorkout.Main.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Find Videos on YouTube
                  </a>
                )}
              </div>
            </div>

            {/* Options to Choose From */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Select Workout for {activeDay}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(workoutOptions).map(([category, options]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-bold text-slate-800 mb-2">{category}</h4>
                    {options.map(opt => {
                      const colors = getTypeColors(opt.type);
                      const isSelected = selectedWorkout.Main.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelect(opt)}
                          className={clsx(
                            "w-full p-4 rounded-xl text-left transition-all relative overflow-hidden border-2",
                            isSelected 
                              ? "bg-white border-blue-500 shadow-md" 
                              : "bg-white border-slate-100 hover:border-blue-300"
                          )}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 text-blue-500">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}
                          <div className={clsx("text-xs font-bold mb-1", colors.text)}>{opt.duration}</div>
                          <div className={clsx("font-semibold text-sm", isSelected ? "text-blue-900" : "text-slate-700")}>
                            {opt.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
