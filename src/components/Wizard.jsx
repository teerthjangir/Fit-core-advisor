import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import clsx from 'clsx';

export default function Wizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    age: '', gender: '', height: '', weight: '',
    activityLevel: '',
    sleepHours: '', stressLevel: '', primaryGoal: '', dietaryPreference: '', wantGymAdvice: '', bodyGoal: '',
    exerciseFrequency: '', waterIntake: '', dietQuality: '',
    waistCircumference: '', previousAttempts: '',
    medicalConditions: '', medications: ''
  });

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else onComplete(formData);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / totalSteps) * 100;

  const renderRadioCards = (field, options) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {options.map(opt => (
        <label
          key={opt}
          className={clsx(
            "flex items-center p-4 border rounded-xl cursor-pointer transition-all",
            formData[field] === opt 
              ? "border-primary-600 bg-primary-50 ring-1 ring-primary-600" 
              : "border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50"
          )}
        >
          <div className="relative flex items-center justify-center w-5 h-5 mr-3">
            <div className={clsx(
              "w-5 h-5 rounded-full border flex items-center justify-center",
              formData[field] === opt ? "border-primary-600" : "border-slate-300"
            )}>
              {formData[field] === opt && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
            </div>
            <input
              type="radio"
              name={field}
              value={opt}
              checked={formData[field] === opt}
              onChange={(e) => updateForm(field, e.target.value)}
              className="absolute opacity-0 w-0 h-0"
            />
          </div>
          <span className={clsx(
            "font-medium",
            formData[field] === opt ? "text-primary-900" : "text-slate-700"
          )}>{opt}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Main Wizard Card */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Health Assessment</h2>
          <p className="text-slate-500">Help us understand your unique health profile to create your personalized plan.</p>
          
          <div className="mt-8">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-sm font-semibold text-slate-900">Step {step} of {totalSteps}</span>
                <span className="text-sm text-slate-500 ml-2">
                  {step === 1 && "Basic Information"}
                  {step === 2 && "Activity Profile"}
                  {step === 3 && "Lifestyle & Goals"}
                  {step === 4 && "Current Habits"}
                  {step === 5 && "Measurements"}
                  {step === 6 && "Medical History"}
                </span>
              </div>
              <span className="text-2xl font-bold text-primary-600">{Math.round(progress)}%</span>
            </div>
            {/* Progress Bar Container */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6 overflow-hidden">
              <div 
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* Step Indicators */}
            <div className="flex justify-between relative px-2">
               <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -z-10 -translate-y-1/2"></div>
                {[1, 2, 3, 4, 5, 6].map((s) => (
                 <div key={s} className={clsx(
                   "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors bg-white border-2",
                   s < step ? "border-primary-600 text-primary-600" : 
                   s === step ? "border-primary-600 bg-primary-600 text-white" : 
                   "border-slate-200 text-slate-400"
                 )}>
                   {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-white min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-semibold text-slate-900">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                    Age <span className="text-red-500">*</span>
                    <Info className="w-4 h-4 text-primary-500" />
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.age}
                      onChange={(e) => updateForm('age', e.target.value)}
                      placeholder="Enter your age"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400 text-sm">years</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender <span className="text-red-500">*</span></label>
                  {renderRadioCards('gender', ['Male', 'Female', 'Other'])}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Height <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.height}
                      onChange={(e) => updateForm('height', e.target.value)}
                      placeholder="Enter your height"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400 text-sm">cm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Weight <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.weight}
                      onChange={(e) => updateForm('weight', e.target.value)}
                      placeholder="Enter your weight"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400 text-sm">kg</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-semibold text-slate-900">Activity Profile</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">How active are you in your daily life?</label>
                {renderRadioCards('activityLevel', [
                  'Sedentary (Desk job, little exercise)', 
                  'Lightly Active (Light exercise 1-3 days/wk)', 
                  'Moderately Active (Moderate exercise 3-5 days/wk)', 
                  'Very Active (Heavy exercise 6-7 days/wk)'
                ])}
              </div>
             </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-semibold text-slate-900">Lifestyle & Goals</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Average Sleep Hours</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={formData.sleepHours}
                      onChange={(e) => updateForm('sleepHours', e.target.value)}
                      placeholder="e.g., 7"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-3.5 text-slate-400 text-sm">hours/night</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dietary Preferences</label>
                  <select 
                    value={formData.dietaryPreference}
                    onChange={(e) => updateForm('dietaryPreference', e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white transition-all"
                  >
                    <option value="">Select a preference</option>
                    <option value="None">No Restrictions</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Keto">Keto</option>
                    <option value="Paleo">Paleo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Stress Level</label>
                {renderRadioCards('stressLevel', ['Low', 'Moderate', 'High', 'Very High'])}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Goal</label>
                {renderRadioCards('primaryGoal', ['Reduce Belly Fat', 'Build Muscle', 'Improve Endurance', 'General Health'])}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Do you want personalized gym advice?</label>
                {renderRadioCards('wantGymAdvice', ['Yes', 'No'])}
              </div>

              {formData.wantGymAdvice === 'Yes' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Target Body Goal</label>
                  {renderRadioCards('bodyGoal', ['Lean', 'Muscular', 'Strength', 'Endurance', 'Flexibility'])}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-semibold text-slate-900">Current Habits</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Exercise Frequency</label>
                  <select 
                    value={formData.exerciseFrequency}
                    onChange={(e) => updateForm('exerciseFrequency', e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white transition-all"
                  >
                    <option value="">Select frequency</option>
                    <option value="0">Rarely/Never</option>
                    <option value="1-2">1-2 times a week</option>
                    <option value="3-4">3-4 times a week</option>
                    <option value="5+">5+ times a week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Water Intake (Daily)</label>
                  <select 
                    value={formData.waterIntake}
                    onChange={(e) => updateForm('waterIntake', e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white transition-all"
                  >
                    <option value="">Select intake</option>
                    <option value="<1L">Less than 1 Liter</option>
                    <option value="1-2L">1 - 2 Liters</option>
                    <option value="2-3L">2 - 3 Liters</option>
                    <option value=">3L">More than 3 Liters</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Overall Diet Quality</label>
                {renderRadioCards('dietQuality', ['Poor (Mostly processed)', 'Fair (Mixed)', 'Good (Mostly whole foods)', 'Excellent (Strict whole foods)'])}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-semibold text-slate-900">Final Measurements</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Waist Circumference</label>
                <div className="relative max-w-md">
                  <input 
                    type="number" 
                    value={formData.waistCircumference}
                    onChange={(e) => updateForm('waistCircumference', e.target.value)}
                    placeholder="e.g., 34"
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  />
                  <span className="absolute right-4 top-3.5 text-slate-400 text-sm">inches</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">Measure around your natural waistline, just above the belly button.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Previous Weight Loss Attempts</label>
                {renderRadioCards('previousAttempts', ['None', '1-2 attempts', '3-5 attempts', 'Many attempts'])}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-semibold text-slate-900">Medical History</h3>
              <p className="text-sm text-slate-500">This helps us ensure your nutrition and exercise recommendations are safe.</p>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical Conditions</label>
                <textarea 
                  value={formData.medicalConditions}
                  onChange={(e) => updateForm('medicalConditions', e.target.value)}
                  placeholder="e.g., Hypertension, Diabetes, Joint Pain (leave blank if none)"
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Medications</label>
                <textarea 
                  value={formData.medications}
                  onChange={(e) => updateForm('medications', e.target.value)}
                  placeholder="List any medications you are currently taking (leave blank if none)"
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <button 
            onClick={handlePrev}
            disabled={step === 1}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors",
              step === 1 ? "opacity-50 cursor-not-allowed text-slate-400 bg-slate-100" : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm shadow-primary-200"
          >
            {step === totalSteps ? 'Complete' : 'Next'}
            {step < totalSteps && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Your Privacy Matters</h4>
          <p className="text-sm text-slate-600 mt-1">All information provided is confidential and used solely to generate your personalized recommendations. We follow strict data protection standards.</p>
        </div>
      </div>
    </div>
  );
}
