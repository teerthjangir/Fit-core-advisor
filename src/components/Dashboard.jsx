import Overview from './Overview';
import ProgressHub from './ProgressHub';
import NutritionHub from './NutritionHub';
import ExerciseLibrary from './ExerciseLibrary';

export default function Dashboard({ activeTab, setActiveTab, healthScore, onRetake, onDailyCheckIn, dailyLogs, currentUser, setCurrentUser }) {
  return (
    <div className="animate-in fade-in duration-500">
      {activeTab === 'Overview' && <Overview setActiveTab={setActiveTab} healthScore={healthScore} onRetake={onRetake} onDailyCheckIn={onDailyCheckIn} currentUser={currentUser} />}
      {activeTab === 'Progress' && <ProgressHub dailyLogs={dailyLogs} />}
      {activeTab === 'Nutrition' && <NutritionHub currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      {activeTab === 'Exercise' && <ExerciseLibrary currentUser={currentUser} setCurrentUser={setCurrentUser} />}
    </div>
  );
}
