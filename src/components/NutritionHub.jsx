import { useState, useMemo } from 'react';
import { Apple, Droplet, Wheat, Fish, Flame, Info, CheckCircle2, Download, Calendar, Save, ShoppingCart } from 'lucide-react';
import clsx from 'clsx';

export default function NutritionHub({ currentUser, setCurrentUser }) {
  const [isSaving, setIsSaving] = useState(false);
  let guidelines = [
    { title: 'Protein Priority', desc: 'Include 25-30g of protein in every meal to preserve muscle and increase satiety.', icon: Fish, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Smart Carbohydrates', desc: 'Focus on complex carbs like oats, quinoa, and sweet potatoes. Time them around workouts.', icon: Wheat, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Healthy Fats', desc: 'Incorporate avocados, nuts, and olive oil for hormone health and joint support.', icon: Droplet, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { title: 'Hydration', desc: 'Aim for at least 2.5L of water daily. Drink 500ml before meals to aid digestion.', icon: Info, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  ];

  if (currentUser?.dietaryPreference === 'Vegetarian' || currentUser?.dietaryPreference === 'Vegan') {
    guidelines[0] = { title: 'Plant-Based Protein', desc: 'Combine legumes, quinoa, and tofu to ensure you get all essential amino acids daily.', icon: Apple, color: 'text-green-500', bg: 'bg-green-50' };
  } else if (currentUser?.dietaryPreference === 'Keto') {
    guidelines[1] = { title: 'Low-Carb Focus', desc: 'Keep net carbs under 50g. Load up on leafy greens and cruciferous vegetables instead of grains.', icon: Apple, color: 'text-green-500', bg: 'bg-green-50' };
    guidelines[2] = { title: 'High Healthy Fats', desc: 'Increase fats like MCT oil, grass-fed butter, and avocados for sustained energy in ketosis.', icon: Droplet, color: 'text-yellow-500', bg: 'bg-yellow-50' };
  }

  const foodOptions = {
    Breakfast: [
      { id: 'b1', name: 'Oatmeal with Protein Powder & Berries', cals: 450, macros: { p: 35, c: 55, f: 10 } },
      { id: 'b2', name: 'Scrambled Eggs with Spinach & Toast', cals: 420, macros: { p: 30, c: 40, f: 15 } },
      { id: 'b3', name: 'Avocado Toast with Poached Eggs', cals: 450, macros: { p: 25, c: 35, f: 22 } },
      { id: 'b4', name: 'Protein Pancakes with Maple Syrup', cals: 500, macros: { p: 40, c: 50, f: 12 } },
      { id: 'b5', name: 'Greek Yogurt Parfait with Granola', cals: 380, macros: { p: 25, c: 45, f: 8 } },
    ],
    Lunch: [
      { id: 'l1', name: 'Grilled Chicken Salad with Olive Oil', cals: 550, macros: { p: 45, c: 20, f: 30 } },
      { id: 'l2', name: 'Turkey Wrap with Hummus & Veggies', cals: 500, macros: { p: 40, c: 45, f: 18 } },
      { id: 'l3', name: 'Quinoa Bowl with Roasted Veggies & Tofu', cals: 520, macros: { p: 25, c: 65, f: 20 } },
      { id: 'l4', name: 'Tuna Salad Sandwich on Whole Wheat', cals: 480, macros: { p: 35, c: 40, f: 15 } },
      { id: 'l5', name: 'Lentil Soup with Side Salad', cals: 400, macros: { p: 20, c: 50, f: 10 } },
    ],
    Snack: [
      { id: 's1', name: 'Greek Yogurt & Almonds', cals: 250, macros: { p: 20, c: 15, f: 12 } },
      { id: 's2', name: 'Apple Slices with Peanut Butter', cals: 300, macros: { p: 10, c: 35, f: 15 } },
      { id: 's3', name: 'Protein Bar', cals: 220, macros: { p: 20, c: 25, f: 8 } },
      { id: 's4', name: 'Cottage Cheese with Pineapple', cals: 180, macros: { p: 25, c: 15, f: 4 } },
      { id: 's5', name: 'Handful of Mixed Nuts', cals: 350, macros: { p: 12, c: 10, f: 30 } },
    ],
    Dinner: [
      { id: 'd1', name: 'Baked Salmon with Quinoa & Asparagus', cals: 600, macros: { p: 40, c: 45, f: 25 } },
      { id: 'd2', name: 'Lean Beef Stir-Fry with Broccoli & Rice', cals: 600, macros: { p: 45, c: 50, f: 20 } },
      { id: 'd3', name: 'Shrimp Tacos with Cabbage Slaw', cals: 780, macros: { p: 45, c: 60, f: 35 } },
      { id: 'd4', name: 'Chicken Breast with Sweet Potato Mash', cals: 550, macros: { p: 50, c: 40, f: 15 } },
      { id: 'd5', name: 'Vegetarian Chili with Cornbread', cals: 500, macros: { p: 25, c: 60, f: 12 } },
    ]
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [activeDay, setActiveDay] = useState('Mon');

  const [weeklyPlan, setWeeklyPlan] = useState(() => {
    if (currentUser?.weeklyPlan && Object.keys(currentUser.weeklyPlan).length > 0) {
      return currentUser.weeklyPlan;
    }
    const plan = {};
    days.forEach((day, index) => {
      plan[day] = {
        Breakfast: foodOptions.Breakfast[index % foodOptions.Breakfast.length],
        Lunch: foodOptions.Lunch[index % foodOptions.Lunch.length],
        Snack: foodOptions.Snack[index % foodOptions.Snack.length],
        Dinner: foodOptions.Dinner[index % foodOptions.Dinner.length]
      };
    });
    return plan;
  });

  const selectedMeals = weeklyPlan[activeDay];

  const totals = useMemo(() => {
    let cals = 0, p = 0, c = 0, f = 0;
    Object.values(selectedMeals).forEach(meal => {
      cals += meal.cals;
      p += meal.macros.p;
      c += meal.macros.c;
      f += meal.macros.f;
    });
    return { cals, p, c, f };
  }, [selectedMeals]);

  const handleSelect = (type, option) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        [type]: option
      }
    }));
  };

  const handleExport = () => {
    let content = "FITCORE ADVISOR - WEEKLY MEAL PLAN\n\n";
    days.forEach(day => {
      content += `=== ${day.toUpperCase()} ===\n`;
      let dayCals = 0;
      Object.entries(weeklyPlan[day]).forEach(([type, meal]) => {
        content += `${type}: ${meal.name} (${meal.cals} kcal)\n`;
        dayCals += meal.cals;
      });
      content += `Total Daily Calories: ${dayCals} kcal\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FitCore_Weekly_Meal_Plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSavePlan = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/user/mealplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id, weeklyPlan })
      });
      const data = await res.json();
      if (data.success && setCurrentUser) {
        setCurrentUser(prev => ({ ...prev, weeklyPlan }));
      }
    } catch (err) {
      console.error('Failed to save meal plan', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateGroceryList = () => {
    let items = new Set();
    days.forEach(day => {
      Object.values(weeklyPlan[day]).forEach(meal => {
        const parts = meal.name.split(/with|&|,/i).map(s => s.trim()).filter(s => s);
        parts.forEach(p => items.add(p));
      });
    });

    let content = "FITCORE ADVISOR - GROCERY LIST\n\n";
    content += "Ingredients to buy:\n\n";
    Array.from(items).sort().forEach(item => {
      content += `[ ] ${item}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FitCore_Grocery_List.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getMealColors = (type) => {
    switch(type) {
      case 'Breakfast': return { border: 'border-yellow-400', bg: 'bg-yellow-50/50', text: 'text-yellow-700' };
      case 'Lunch': return { border: 'border-green-400', bg: 'bg-green-50/50', text: 'text-green-700' };
      case 'Snack': return { border: 'border-purple-400', bg: 'bg-purple-50/50', text: 'text-purple-700' };
      case 'Dinner': return { border: 'border-blue-400', bg: 'bg-blue-50/50', text: 'text-blue-700' };
      default: return { border: 'border-slate-400', bg: 'bg-slate-50', text: 'text-slate-700' };
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Custom Meal Planner</h1>
        <p className="text-slate-500">Build your daily menu and we'll calculate your macros automatically.</p>
      </div>

      {/* Dietary Guidelines Grid */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Dietary Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {guidelines.map((g, idx) => (
            <div key={idx} className="glass-card p-5 hover:-translate-y-1 transition-transform duration-300">
              <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center mb-4", g.bg)}>
                <g.icon className={clsx("w-5 h-5", g.color)} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{g.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customizable Planner */}
      <section className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Weekly Meal Calendar</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={handleGenerateGroceryList}
              className="flex items-center gap-2 px-4 py-2 bg-white text-green-700 border border-green-200 hover:bg-green-50 rounded-xl font-medium text-sm transition-colors shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" /> Grocery List
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-medium text-sm transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button 
              onClick={handleSavePlan}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
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
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/20" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">{activeDay}'s Menu Builder</h2>
          <div className="flex items-center gap-6 divide-x divide-slate-200 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 text-primary-700 font-bold px-2">
              <Flame className="w-5 h-5" />
              <span>{totals.cals} kcal</span>
            </div>
            <div className="px-4 text-sm"><span className="font-bold text-slate-800">{totals.p}g</span> <span className="text-slate-500">Protein</span></div>
            <div className="px-4 text-sm"><span className="font-bold text-slate-800">{totals.c}g</span> <span className="text-slate-500">Carbs</span></div>
            <div className="px-4 text-sm"><span className="font-bold text-slate-800">{totals.f}g</span> <span className="text-slate-500">Fats</span></div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {Object.keys(foodOptions).map((type) => {
              const colors = getMealColors(type);
              const selected = selectedMeals[type];
              
              return (
                <div key={type} className={clsx("rounded-2xl p-5 border-l-4 shadow-sm", colors.bg, colors.border)}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Info */}
                    <div className="lg:w-1/3">
                      <div className={clsx("text-xs font-bold uppercase tracking-wider mb-2", colors.text)}>
                        {type}
                      </div>
                      <h3 className="text-slate-900 font-bold text-lg mb-2">{selected.name}</h3>
                      <div className="flex gap-4 text-sm">
                        <span className="font-semibold text-slate-800">{selected.cals} <span className="text-slate-500 font-normal">kcal</span></span>
                        <span className="text-slate-400">|</span>
                        <span className="font-semibold text-slate-800">{selected.macros.p}g <span className="text-slate-500 font-normal">P</span></span>
                        <span className="text-slate-400">|</span>
                        <span className="font-semibold text-slate-800">{selected.macros.c}g <span className="text-slate-500 font-normal">C</span></span>
                        <span className="text-slate-400">|</span>
                        <span className="font-semibold text-slate-800">{selected.macros.f}g <span className="text-slate-500 font-normal">F</span></span>
                      </div>
                    </div>
                    
                    {/* Selection */}
                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {foodOptions[type].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelect(type, opt)}
                          className={clsx(
                            "p-3 rounded-xl border text-left transition-all relative overflow-hidden",
                            selected.id === opt.id 
                              ? "bg-white border-primary-500 shadow-md ring-1 ring-primary-500" 
                              : "bg-white/60 border-slate-200 hover:border-primary-300 hover:bg-white"
                          )}
                        >
                          {selected.id === opt.id && (
                            <div className="absolute top-2 right-2 text-primary-500">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          )}
                          <h4 className={clsx("font-semibold text-sm pr-6", selected.id === opt.id ? "text-primary-900" : "text-slate-700")}>{opt.name}</h4>
                          <div className="mt-1 text-xs text-slate-500">{opt.cals} kcal</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
