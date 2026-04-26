import { useState, useEffect } from 'react';
import { Activity, LayoutDashboard, Target, Apple, Dumbbell, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Wizard from './components/Wizard';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import MedicalProfile from './components/MedicalProfile';
import Community from './components/Community';
import GymHub from './components/GymHub';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'home', 'assessment', 'dashboard', 'login'
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [healthScore, setHealthScore] = useState(() => {
    const savedUser = localStorage.getItem('fitcore_user');
    return savedUser ? JSON.parse(savedUser).healthScore || 0 : 0;
  });
  const [dailyLogs, setDailyLogs] = useState(() => {
    const savedUser = localStorage.getItem('fitcore_user');
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    return parsedUser && parsedUser.dailyLogs && parsedUser.dailyLogs.length > 0 
      ? parsedUser.dailyLogs 
      : [{ day: 'Start', score: 0 }];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('fitcore_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fitcore_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fitcore_user');
    }
  }, [currentUser]);

  const handleAssessmentComplete = async (formData) => {
    if (formData) {
      setHealthScore(0);
      setDailyLogs([{ day: 'Assessment', score: 0, date: new Date().toISOString() }]);
      
      if (currentUser) {
        try {
          const res = await fetch('/api/assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id, formData, score: 0 })
          });
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
          }
        } catch (err) {
          console.error("Failed to save assessment to backend", err);
        }
      } else {
        // Guest mode: Save data locally to support session persistence without an account
        const guestUser = {
          _id: 'guest',
          name: 'Guest User',
          medicalConditions: formData.medicalConditions ? formData.medicalConditions.split(',').map(s => s.trim()).filter(Boolean) : [],
          medications: formData.medications ? formData.medications.split(',').map(s => s.trim()).filter(Boolean) : [],
          bodyGoal: formData.bodyGoal,
          dietaryPreference: formData.dietaryPreference,
          healthScore: 0,
          dailyLogs: [{ day: 'Assessment', score: 0, date: new Date().toISOString() }]
        };
        setCurrentUser(guestUser);
      }
    }
    setCurrentView('dashboard');
  };

  const handleDailyCheckIn = async (checkInData) => {
    let boost = 0;
    if (checkInData.mealPlan) boost += 5;
    if (checkInData.exercisePlan) boost += 10;
    if (checkInData.water) boost += 2;
    if (checkInData.sleep) boost += 3;

    const newScore = Math.min(healthScore + boost, 100);
    setHealthScore(newScore);
    
    setDailyLogs(prev => {
      const newLogs = [...prev, { day: `Day ${prev.length}`, score: newScore, date: new Date().toISOString() }];
      return newLogs;
    });

    // Save to backend
    if (currentUser) {
      try {
        await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id, formData: checkInData, score: newScore })
        });
        
        // Update current user in state to persist daily logs
        setCurrentUser(prev => ({
          ...prev,
          healthScore: newScore,
          dailyLogs: [...(prev.dailyLogs || []), { day: `Day ${prev.dailyLogs?.length || 0}`, score: newScore, date: new Date().toISOString() }]
        }));
      } catch (err) {
        console.error("Failed to save daily check-in", err);
      }
    }
  };

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = (user) => {
    if (user) {
      setCurrentUser(user);
      setHealthScore(user.healthScore || 0);
      setDailyLogs(user.dailyLogs && user.dailyLogs.length > 0 ? user.dailyLogs : [{ day: 'Start', score: 0, date: new Date().toISOString() }]);
      
      const hasTakenAssessment = user.dailyLogs && user.dailyLogs.some(log => log.day !== 'Start');
      setCurrentView(hasTakenAssessment ? 'dashboard' : 'assessment');
    } else {
      // Dummy login fallback: start fresh
      setCurrentUser({ name: 'Guest User', _id: 'guest', healthScore: 0, dailyLogs: [{ day: 'Start', score: 0, date: new Date().toISOString() }] });
      setHealthScore(0);
      setDailyLogs([{ day: 'Start', score: 0, date: new Date().toISOString() }]);
      setCurrentView('assessment');
    }
  };



  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setHealthScore(0);
    setDailyLogs([{ day: 'Start', score: 0 }]);
    setCurrentView('login');
  };

  if (currentView === 'home') {
    return <Home onStartAssessment={handleStartAssessment} onLoginClick={handleLoginClick} />;
  }

  if (currentView === 'login') {
    return <Login onBack={handleBackToHome} onLogin={handleLoginSuccess} />;
  }

  if (currentView === 'assessment') {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl">
          <div className="flex items-center gap-2 mb-8 justify-center sm:justify-start">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">FitCore Advisor</h1>
          </div>
          <Wizard onComplete={handleAssessmentComplete} />
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'Overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'Progress', icon: Target, label: 'Progress Hub' },
    { id: 'Nutrition', icon: Apple, label: 'Nutrition Hub' },
    { id: 'GymHub', icon: Dumbbell, label: 'Gym Hub' },
    { id: 'Exercise', icon: Activity, label: 'Exercise Library' },
    { id: 'MedicalProfile', icon: Activity, label: 'Medical Profile' },
    { id: 'Community', icon: Target, label: 'Community Forum' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-1.5 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">FitCore Advisor</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={clsx(
        "fixed md:sticky top-0 z-40 h-screen w-64 bg-white border-r border-slate-200 p-4 flex flex-col transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="hidden md:flex items-center gap-2 mb-8 px-2 py-4">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl">FitCore Advisor</span>
        </div>

        <nav className="flex-1 space-y-2 mt-8 md:mt-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left",
                activeTab === item.id 
                  ? "bg-primary-50 text-primary-700 font-medium" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <item.icon className={clsx("w-5 h-5", activeTab === item.id ? "text-primary-600" : "text-slate-400")} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'MedicalProfile' ? (
          <MedicalProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />
        ) : activeTab === 'Community' ? (
          <Community currentUser={currentUser} />
        ) : activeTab === 'GymHub' ? (
          <GymHub currentUser={currentUser} setCurrentUser={setCurrentUser} />
        ) : (
          <Dashboard 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            healthScore={healthScore} 
            onRetake={handleStartAssessment}
            onDailyCheckIn={handleDailyCheckIn}
            dailyLogs={dailyLogs}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </main>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
