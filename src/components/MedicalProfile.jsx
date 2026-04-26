import React, { useState, useEffect } from 'react';
import { Activity, Plus, Trash2, HeartPulse, Pill, Save } from 'lucide-react';
import clsx from 'clsx';

export default function MedicalProfile({ currentUser, setCurrentUser }) {
  const [conditions, setConditions] = useState(currentUser?.medicalConditions || []);
  const [medications, setMedications] = useState(currentUser?.medications || []);
  


  useEffect(() => {
    if (currentUser) {
      setConditions(currentUser.medicalConditions || []);
      setMedications(currentUser.medications || []);
    }
  }, [currentUser]);



  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Medical Profile</h1>
          <p className="text-slate-500">Your medical conditions and medications from your assessment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Conditions */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Medical Conditions</h2>
          </div>

          <div className="space-y-3">
            {conditions.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No conditions added yet.</p>
            ) : (
              conditions.map((condition, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-white shadow-sm">
                  <span className="font-medium text-slate-700">{condition}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Medications */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
              <Pill className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Current Medications</h2>
          </div>

          <div className="space-y-3">
            {medications.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No medications added yet.</p>
            ) : (
              medications.map((medication, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-white shadow-sm">
                  <span className="font-medium text-slate-700">{medication}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Dietary Recommendations Based on Profile */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-green-100 text-green-600">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Dietary Recommendations</h2>
        </div>
        
        {conditions.length === 0 ? (
          <p className="text-slate-500">Add medical conditions above to see personalized dietary recommendations.</p>
        ) : (
          <div className="space-y-4">
            {conditions.some(c => c.toLowerCase().includes('hypertension') || c.toLowerCase().includes('blood pressure')) && (
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <h3 className="font-semibold text-orange-800 mb-1">Blood Pressure Support</h3>
                <p className="text-sm text-orange-700 mb-2">Limit sodium intake to under 1500mg daily. Increase potassium-rich foods to help manage blood pressure.</p>
                <div className="text-xs text-orange-900 font-medium">
                  <span className="block mb-1">✅ <b>Recommended Fruits & Veggies:</b> Bananas, sweet potatoes, spinach, broccoli, avocados.</span>
                  <span className="block">❌ <b>Foods to Avoid:</b> Canned soups, salty snacks, processed meats, soy sauce.</span>
                </div>
              </div>
            )}
            {conditions.some(c => c.toLowerCase().includes('diabetes') || c.toLowerCase().includes('insulin') || c.toLowerCase().includes('sugar')) && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-1">Blood Sugar Management</h3>
                <p className="text-sm text-blue-700 mb-2">Focus on low glycemic index foods. Pair carbohydrates with proteins and healthy fats to slow down glucose absorption.</p>
                <div className="text-xs text-blue-900 font-medium">
                  <span className="block mb-1">✅ <b>Recommended Fruits & Veggies:</b> Leafy greens, berries (blueberries, strawberries), tomatoes, bell peppers.</span>
                  <span className="block">❌ <b>Foods to Avoid:</b> Sugary drinks, white bread, pastries, sweetened yogurts.</span>
                </div>
              </div>
            )}
            {conditions.some(c => c.toLowerCase().includes('joint') || c.toLowerCase().includes('arthritis')) && (
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h3 className="font-semibold text-indigo-800 mb-1">Joint Health</h3>
                <p className="text-sm text-indigo-700 mb-2">Increase Omega-3 fatty acids and anti-inflammatory foods to help reduce joint inflammation naturally.</p>
                <div className="text-xs text-indigo-900 font-medium">
                  <span className="block mb-1">✅ <b>Recommended Fruits & Veggies:</b> Oranges, tart cherries, kale, Brussels sprouts, carrots.</span>
                  <span className="block">❌ <b>Foods to Avoid:</b> Deep fried foods, excessive refined sugar, processed red meats.</span>
                </div>
              </div>
            )}
            {conditions.some(c => c.toLowerCase().includes('asthma') || c.toLowerCase().includes('respiratory')) && (
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                <h3 className="font-semibold text-teal-800 mb-1">Respiratory Health</h3>
                <p className="text-sm text-teal-700 mb-2">Consume foods rich in Vitamin C, Vitamin E, and beta-carotene to support lung function and reduce airway inflammation.</p>
                <div className="text-xs text-teal-900 font-medium">
                  <span className="block mb-1">✅ <b>Recommended Fruits & Veggies:</b> Apples, cantaloupe, carrots, spinach, tomatoes.</span>
                  <span className="block">❌ <b>Foods to Avoid:</b> Sulfite-rich foods (dried fruits), large meals that cause acid reflux.</span>
                </div>
              </div>
            )}
            {/* Generic recommendation if conditions exist but don't match above */}
            {conditions.length > 0 && !conditions.some(c => /hypertension|blood pressure|diabetes|insulin|sugar|joint|arthritis|asthma|respiratory/i.test(c)) && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <h3 className="font-semibold text-emerald-800 mb-1">General Wellness Foods</h3>
                <p className="text-sm text-emerald-700 mb-2">To support your specific conditions, a foundation of antioxidant-rich plant foods is highly recommended.</p>
                <div className="text-xs text-emerald-900 font-medium">
                  <span className="block mb-1">✅ <b>Recommended Fruits & Veggies:</b> Dark leafy greens (spinach, kale), mixed berries, cruciferous vegetables (broccoli, cauliflower).</span>
                  <span className="block">❌ <b>General Avoidance:</b> Ultra-processed foods, high-sugar snacks.</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
