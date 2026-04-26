import React from 'react';
import { 
  Activity, Play, CheckCircle2, Users, Star, GraduationCap, 
  FileText, Home as HomeIcon, ClipboardList, LineChart, Dumbbell,
  MoreHorizontal, User, Beaker, Flame, ArrowRight
} from 'lucide-react';

const Home = ({ onStartAssessment, onLoginClick }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-primary-600 p-1.5 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">FitCore Advisor</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="flex items-center gap-1.5 text-primary-600 font-medium">
                <HomeIcon className="w-4 h-4" /> Home
              </a>
              <a href="#" className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 transition-colors">
                <ClipboardList className="w-4 h-4" /> Assessment
              </a>
              <a href="#" className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 transition-colors">
                <LineChart className="w-4 h-4" /> Results
              </a>
              <a href="#" className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 transition-colors">
                <Dumbbell className="w-4 h-4" /> Exercise
              </a>
              <a href="#" className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" /> More
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onLoginClick}
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors hidden sm:block"
              >
                Log in
              </button>
              <button 
                onClick={onStartAssessment}
                className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary-600/20"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-medium text-sm">
              <Activity className="w-4 h-4" />
              Science-Backed Wellness Guidance
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900">
              Your Body is Unique,<br/>Your Plan Should Be Too
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Experience personalized health and fitness consultation that combines AI-driven assessment with evidence-based wellness guidance. Get medically-informed, individually tailored belly fat reduction programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onStartAssessment}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary-600/20"
              >
                Start Free Assessment <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors">
                <Play className="w-5 h-5 fill-slate-700" /> Watch How It Works
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Medically Reviewed
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-5 h-5 text-primary-600" />
                50,000+ Users
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-transparent rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="/images/hero.png" 
              alt="Woman measuring waist" 
              className="rounded-3xl shadow-2xl border border-white/50 w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Main Tagline */}
      <section className="py-16 bg-white border-y border-slate-200 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm mb-6">
          <CheckCircle2 className="w-4 h-4" />
          Core Features
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Science-Backed Strategies, Personally Tailored</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We combine medical expertise with advanced technology to deliver wellness guidance that actually works for your unique body
        </p>
      </section>

      {/* Features Sections */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
        {/* Feature 1 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-gradient-to-bl from-blue-100 to-transparent rounded-3xl transform -translate-x-4 translate-y-4 -z-10"></div>
             <img src="/images/assessment.png" alt="Personalized Assessment" className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]" />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center">
              <User className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Personalized Assessment</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Comprehensive health profiling that considers your unique body composition, medical history, lifestyle factors, and personal goals to create a truly individualized plan.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center">
              <Beaker className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Evidence-Based Nutrition</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Dietary recommendations grounded in nutritional science, with meal planning tools, ingredient substitutions, and cultural food preferences that fit your lifestyle.
            </p>
            <div className="flex gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Scientifically Proven
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-primary-600" /> Medically Reviewed
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-transparent rounded-3xl transform translate-x-4 -translate-y-4 -z-10"></div>
             <img src="/images/nutrition.png" alt="Nutrition" className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]" />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute inset-0 bg-gradient-to-tl from-orange-100 to-transparent rounded-3xl transform -translate-x-4 -translate-y-4 -z-10"></div>
             <img src="/images/exercise.png" alt="Exercise" className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]" />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Custom Exercise Plans</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Tailored workout routines with video demonstrations, difficulty progressions, and safety modifications designed specifically for belly fat reduction and overall wellness.
            </p>
            <div className="flex gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Scientifically Proven
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-primary-600" /> Medically Reviewed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">50,000+</div>
              <div className="text-slate-500 font-medium">Active Users</div>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">4.9/5</div>
              <div className="text-slate-500 font-medium">User Rating</div>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">100+</div>
              <div className="text-slate-500 font-medium">Expert Partners</div>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">1,000+</div>
              <div className="text-slate-500 font-medium">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Header */}
      <section className="py-24 bg-slate-50 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6">
          <Activity className="w-4 h-4" />
          Simple Process
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">How FitCore Advisor Works</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Four simple steps to transform your health journey with personalized, science-backed guidance
        </p>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-slate-900 text-white py-16 text-center">
        <h3 className="text-3xl font-bold mb-6 tracking-tight">Ready to transform your health?</h3>
        <button 
          onClick={onStartAssessment}
          className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors shadow-lg shadow-primary-600/30"
        >
          Start Your Free Assessment
        </button>
      </footer>
    </div>
  );
};

export default Home;
