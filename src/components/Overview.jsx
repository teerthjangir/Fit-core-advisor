import { useState, useEffect as import_react_useEffect } from 'react';
import { Flame, Target, ChevronRight, Apple, Dumbbell, Activity, TrendingDown, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export default function Overview({ setActiveTab, healthScore = 0, onRetake, onDailyCheckIn, currentUser }) {
  const [checkIn, setCheckIn] = useState({ mealPlan: false, exercisePlan: false, water: false, sleep: false });

  const hasLoggedToday = () => {
    if (!currentUser || !currentUser.dailyLogs || currentUser.dailyLogs.length === 0) return false;
    const lastLog = currentUser.dailyLogs[currentUser.dailyLogs.length - 1];
    if (!lastLog.date) return false;
    const logDate = new Date(lastLog.date);
    const today = new Date();
    return logDate.toDateString() === today.toDateString() && lastLog.day !== 'Start' && lastLog.day !== 'Assessment';
  };

  const [isLogged, setIsLogged] = useState(hasLoggedToday());

  // Update when currentUser updates
  import_react_useEffect(() => {
    setIsLogged(hasLoggedToday());
  }, [currentUser]);

  const handleLogProgress = () => {
    if (onDailyCheckIn && !isLogged) {
      onDailyCheckIn(checkIn);
      setIsLogged(true);
    }
  };
  const recommendations = [];

  if (currentUser?.medicalConditions?.includes('Hypertension')) {
    recommendations.push({ id: 'med-1', title: 'Monitor Sodium Intake', desc: 'Keep sodium under 1500mg daily to support blood pressure.', priority: 'High', icon: Activity, color: 'text-red-500', bg: 'bg-red-100' });
  }
  if (currentUser?.medicalConditions?.includes('Joint Pain')) {
    recommendations.push({ id: 'med-2', title: 'Low Impact Movement', desc: 'Focus on swimming or cycling to protect your joints while burning fat.', priority: 'Medium', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100' });
  }

  if (healthScore < 50) {
    recommendations.push({ id: 1, title: 'Build Consistency', desc: 'Start with just 15 minutes of activity today.', priority: 'High', icon: Target, color: 'text-red-500', bg: 'bg-red-100' });
    recommendations.push({ id: 3, title: 'Improve Sleep Quality', desc: 'Try to get 7.5 hours of sleep to reduce cortisol.', priority: 'Medium', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' });
  } else {
    recommendations.push({ id: 1, title: 'Increase Protein Intake', desc: 'Aim for 120g daily to preserve muscle mass.', priority: 'High', icon: Apple, color: 'text-orange-500', bg: 'bg-orange-100' });
    recommendations.push({ id: 2, title: 'Add Resistance Training', desc: 'Include 2 days of strength training this week.', priority: 'High', icon: Dumbbell, color: 'text-blue-500', bg: 'bg-blue-100' });
  }

  const quickAccess = [
    { id: 'Exercise', title: 'Exercise Library', icon: Dumbbell, desc: 'Find workouts', color: 'bg-blue-500' },
    { id: 'Nutrition', title: 'Nutrition Hub', icon: Apple, desc: 'Meal plans', color: 'bg-green-500' },
    { id: 'Progress', title: 'Progress Tracking', icon: TrendingDown, desc: 'View charts', color: 'bg-purple-500' },
    { id: 'Retake', title: 'Retake Assessment', icon: Activity, desc: 'Update stats', color: 'bg-orange-500' },
  ];

  const currentProgress = [
    { title: 'Body Fat %', current: 24, target: 18, unit: '%', progress: 40, color: 'bg-blue-500' },
    { title: 'Waist Circumference', current: 34, target: 32, unit: 'in', progress: 60, color: 'bg-indigo-500' },
    { title: 'Weekly Exercise', current: 2, target: 4, unit: 'days', progress: 50, color: 'bg-emerald-500' },
    { title: 'Daily Protein', current: 90, target: 120, unit: 'g', progress: 75, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-lg shadow-primary-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {currentUser?.name?.split(' ')[0] || 'Alex'}!</h1>
            <p className="text-primary-100 text-lg">Your personalized plan is ready. Let's make today count.</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center min-w-[160px]">
            <div className="text-sm font-medium text-primary-100 uppercase tracking-wider mb-1">Health Score</div>
            <div className={clsx("text-5xl font-bold flex items-baseline justify-center gap-1", healthScore > 80 ? "text-green-300" : healthScore > 60 ? "text-white" : "text-orange-300")}>
              {healthScore}<span className="text-xl text-primary-200">/100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Current Progress */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Current Progress</h2>
              <button onClick={() => setActiveTab('Progress')} className="text-primary-600 font-medium text-sm flex items-center hover:text-primary-700">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentProgress.map((item, idx) => (
                <div key={idx} className="glass-card p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-700">{item.title}</span>
                    <span className="text-sm font-bold text-slate-900">{item.current}<span className="text-slate-500 font-normal ml-0.5">{item.unit}</span></span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                    <div className={clsx("h-2 rounded-full", item.color)} style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{item.progress}% to goal</span>
                    <span>Target: {item.target}{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Milestones */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Milestones</h2>
            <div className="glass-card p-6 space-y-6">
              <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[35px] bg-white border-2 border-primary-500 w-4 h-4 rounded-full mt-1"></div>
                  <h3 className="font-bold text-slate-900">First 5% Body Fat Reduction</h3>
                  <p className="text-sm text-slate-500 mt-1 mb-3">You are 2.5% away from reaching your first major fat loss milestone.</p>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                    <div className="bg-primary-500 h-1.5 rounded-full w-1/2"></div>
                  </div>
                  <span className="text-xs font-medium text-primary-600">50% Completed</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[35px] bg-slate-100 border-2 border-slate-300 w-4 h-4 rounded-full mt-1"></div>
                  <h3 className="font-bold text-slate-900">14-Day Workout Streak</h3>
                  <p className="text-sm text-slate-500 mt-1 mb-3">Hit your weekly workout targets consistently.</p>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                    <div className="bg-slate-400 h-1.5 rounded-full w-[20%]"></div>
                  </div>
                  <span className="text-xs font-medium text-slate-500">Day 3 of 14</span>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Check-In */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Daily Check-In</h2>
            <div className="glass-card p-6">
              <p className="text-sm text-slate-600 mb-4">What did you accomplish today?</p>

              <div className="space-y-3 mb-6">
                {[
                  { id: 'mealPlan', label: 'Followed Meal Plan' },
                  { id: 'exercisePlan', label: 'Completed Exercise Plan' },
                  { id: 'water', label: 'Drank 3 Liters Water' },
                  { id: 'sleep', label: 'Slept 7+ Hours' },
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      checked={checkIn[item.id]}
                      onChange={(e) => setCheckIn(prev => ({ ...prev, [item.id]: e.target.checked }))}
                      disabled={isLogged}
                    />
                    <span className="text-slate-700 font-medium text-sm">{item.label}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleLogProgress}
                disabled={isLogged}
                className={clsx(
                  "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                  isLogged
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 text-white shadow-sm"
                )}
              >
                {isLogged ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Progress Logged!
                  </>
                ) : (
                  "Log Today's Progress"
                )}
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">

          {/* Priority Recommendations */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Priority Recommendations</h2>
            <div className="space-y-3">
              {recommendations.map(rec => (
                <div key={rec.id} className="glass-card p-4 flex gap-4 items-start">
                  <div className={clsx("p-2 rounded-lg shrink-0", rec.bg)}>
                    <rec.icon className={clsx("w-5 h-5", rec.color)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 text-sm">{rec.title}</h3>
                      <span className={clsx(
                        "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
                        rec.priority === 'High' ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                      )}>{rec.priority}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Access Grid */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickAccess.map(item => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'Retake' ? onRetake() : setActiveTab(item.id)}
                  className="glass-card p-4 flex flex-col items-start hover:border-primary-300 hover:shadow-md transition-all text-left group"
                >
                  <div className={clsx("p-2.5 rounded-xl mb-3 text-white", item.color)}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 mb-2">{item.desc}</p>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 mt-auto transition-colors" />
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
