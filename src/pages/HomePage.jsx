import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Brain, BookOpen, Users } from 'lucide-react';

/**
 * HomePage Component
 * Landing page with feature highlights
 */
const HomePage = ({ onNavigate }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Get personalized study recommendations and summaries powered by AI',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: Zap,
      title: 'Smart Focus Timer',
      description: 'Pomodoro-based timer with ambient music for distraction-free studying',
      color: 'from-orange-500 to-pink-500',
    },
    {
      icon: BookOpen,
      title: 'Dynamic Content',
      description: 'Create quizzes, flashcards, and study guides instantly from any text',
      color: 'from-primary-400 to-accent-500',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Share knowledge, ask questions, and learn together with peers',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl">
            <Sparkles className="text-accent-400" size={28} />
            <span>StudyMate AI</span>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="text-center max-w-3xl mx-auto">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
          >
            <Zap size={16} className="text-accent-400" />
            <span className="text-sm font-medium">The future of smart learning</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
              Learn Smarter
            </span>
            <br />
            <span className="text-white">With AI Everywhere</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-slate-300 mb-8 leading-relaxed"
          >
            StudyMate AI combines powerful AI tools, focus techniques, and community learning
            to help you study efficiently and achieve your academic goals.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all group"
          >
            Start Learning Now
            <ArrowRight
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ float: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-32 right-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ float: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-32 left-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl pointer-events-none"
        />
      </motion.section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Powerful Features for Better Learning
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-primary-500/50 transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
        <p className="text-xl text-slate-300 mb-10">
          Join thousands of students already studying smarter with StudyMate AI.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('dashboard')}
          className="px-10 py-4 bg-gradient-to-r from-accent-500 to-emerald-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-accent-500/50 transition-all"
        >
          Get Started Free
        </motion.button>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-8 text-center text-slate-400">
        <p>&copy; 2026 StudyMate AI. SmartLearning, Every Day</p>
      </footer>
    </div>
  );
};

export default HomePage;
