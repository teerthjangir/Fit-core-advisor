import { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Scale, Ruler, Activity, Medal, Trophy, Star, Target, CheckCircle2, Upload } from 'lucide-react';
import clsx from 'clsx';

const mockData = [
  { week: 'Week 1', weight: 85, bodyFat: 28, bmi: 27.5 },
  { week: 'Week 2', weight: 84.2, bodyFat: 27.5, bmi: 27.2 },
  { week: 'Week 3', weight: 83.5, bodyFat: 27.1, bmi: 27.0 },
  { week: 'Week 4', weight: 82.8, bodyFat: 26.5, bmi: 26.8 },
  { week: 'Week 5', weight: 82.0, bodyFat: 25.8, bmi: 26.5 },
  { week: 'Week 6', weight: 81.5, bodyFat: 25.2, bmi: 26.3 },
  { week: 'Week 7', weight: 80.8, bodyFat: 24.6, bmi: 26.1 },
  { week: 'Week 8', weight: 80.2, bodyFat: 24.0, bmi: 25.9 },
];

export default function ProgressHub({ dailyLogs = [] }) {
  const [photos, setPhotos] = useState([
    { id: 1, label: 'Week 1', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80' },
    { id: 2, label: 'Week 4', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80' },
    { id: 3, label: 'Week 8', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80' },
    { id: 4, label: 'Current', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80' }
  ]);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPhotoUrl = URL.createObjectURL(file);
      setPhotos([...photos, { id: Date.now(), label: 'New Upload', url: newPhotoUrl }]);
    }
  };

  const metrics = [
    { title: 'Current Weight', value: '80.2', unit: 'kg', icon: Scale, change: '-4.8kg', trend: 'down', color: 'text-blue-500', bg: 'bg-blue-100' },
    { title: 'Waist Size', value: '34', unit: 'in', icon: Ruler, change: '-2in', trend: 'down', color: 'text-indigo-500', bg: 'bg-indigo-100' },
    { title: 'Body Fat', value: '24', unit: '%', icon: Target, change: '-4%', trend: 'down', color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { title: 'Workouts', value: '32', unit: 'total', icon: Activity, change: '+4 this week', trend: 'up', color: 'text-orange-500', bg: 'bg-orange-100' }
  ];

  const badges = [
    { id: 1, title: 'Early Bird', desc: '5 AM workouts', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 2, title: 'Consistency King', desc: '14 days streak', icon: Trophy, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 3, title: 'Nutrition Master', desc: 'Hit macros 7 days', icon: Medal, color: 'text-blue-500', bg: 'bg-blue-100' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Progress Hub</h1>
        <p className="text-slate-500">Track your transformation journey and celebrate your milestones.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="glass-card p-5">
            <div className="flex justify-between items-start mb-4">
              <div className={clsx("p-2 rounded-lg", m.bg)}>
                <m.icon className={clsx("w-5 h-5", m.color)} />
              </div>
              <span className={clsx(
                "text-xs font-semibold px-2 py-1 rounded-full",
                m.trend === 'down' ? "bg-emerald-100 text-emerald-700" : "bg-emerald-100 text-emerald-700"
              )}>
                {m.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{m.title}</h3>
            <div className="text-2xl font-bold text-slate-900">
              {m.value}<span className="text-sm font-normal text-slate-500 ml-1">{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Health Score Progress</h2>
            <div className="h-[300px] w-full">
              {dailyLogs && dailyLogs.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyLogs} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="score" name="Health Score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  No progress logged yet. Take the assessment to start!
                </div>
              )}
            </div>
          </section>

          {/* Progress Photos */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900">Progress Photos</h2>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                className="hidden" 
                accept="image/*"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-sm font-medium text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <Upload className="w-4 h-4" /> Add Photo
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-slate-200 shadow-sm">
                  <img 
                    src={photo.url} 
                    alt={photo.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-3 left-3 text-white font-medium text-sm">
                    {photo.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Achievements */}
          <section className="glass-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Achievements</h2>
            <div className="space-y-4">
              {badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-primary-100 hover:bg-primary-50/50 transition-colors">
                  <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center shrink-0", badge.bg)}>
                    <badge.icon className={clsx("w-6 h-6", badge.color)} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">{badge.title}</h3>
                    <p className="text-xs text-slate-500">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="glass-card p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Journey Milestones</h2>
            <div className="relative pl-6 border-l-2 border-primary-100 space-y-6">
              
              <div className="relative">
                <div className="absolute -left-[35px] bg-white border-2 border-primary-500 text-primary-500 w-6 h-6 rounded-full flex items-center justify-center -mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">First 5lbs Lost!</h3>
                <p className="text-xs text-slate-500 mt-1">Completed on Oct 12</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[35px] bg-white border-2 border-primary-500 text-primary-500 w-6 h-6 rounded-full flex items-center justify-center -mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">7-Day Streak</h3>
                <p className="text-xs text-slate-500 mt-1">Completed on Oct 20</p>
              </div>

              <div className="relative opacity-50">
                <div className="absolute -left-[35px] bg-white border-2 border-slate-300 w-6 h-6 rounded-full -mt-1"></div>
                <h3 className="font-semibold text-slate-900 text-sm">Drop 1 Waist Size</h3>
                <p className="text-xs text-slate-500 mt-1">Target: Nov 15</p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
