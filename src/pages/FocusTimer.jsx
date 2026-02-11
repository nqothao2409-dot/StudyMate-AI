import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Music } from 'lucide-react';

/**
 * Focus Timer Page Component
 * Pomodoro timer with ambient music support
 */
const FocusTimer = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(
    new Audio(
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3'
    )
  );

  const modes = [
    { id: 'pomodoro', label: 'Học bài', min: 25 },
    { id: 'short', label: 'Nghỉ ngắn', min: 5 },
    { id: 'long', label: 'Nghỉ dài', min: 15 },
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setAudioPlaying(false);
      audioRef.current.pause();
      if (mode === 'pomodoro') {
        onSessionComplete(25);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, onSessionComplete]);

  useEffect(() => {
    if (audioPlaying) {
      audioRef.current.loop = true;
      audioRef.current.play().catch((e) => console.log('Audio play failed', e));
    } else {
      audioRef.current.pause();
    }
  }, [audioPlaying]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleModeChange = (newMode) => {
    const minutes = modes.find((m) => m.id === newMode)?.min || 25;
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(minutes * 60);
  };

  const handleReset = () => {
    setIsActive(false);
    const minutes = modes.find((m) => m.id === mode)?.min || 25;
    setTimeLeft(minutes * 60);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="card p-12 w-full max-w-lg text-center relative overflow-hidden"
      >
        {/* Top Status Bar */}
        <motion.div
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400"
        />

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-8 bg-slate-100 p-1 rounded-xl inline-flex mx-auto"
        >
          {modes.map((m) => (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeChange(m.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === m.id
                  ? 'bg-white text-accent-600 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {m.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Timer Display */}
        <motion.div
          animate={{ scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-7xl md:text-8xl font-black text-slate-800 tracking-tighter mb-8 font-mono"
        >
          {formatTime(timeLeft)}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsActive(!isActive)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl shadow-lg transition-all font-bold ${
              isActive
                ? 'bg-gradient-to-br from-amber-500 to-amber-600'
                : 'bg-gradient-to-br from-accent-500 to-accent-600'
            }`}
          >
            {isActive ? <Pause fill="white" size={24} /> : <Play fill="white" size={24} className="ml-1" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-colors shadow-soft"
          >
            <RotateCcw size={24} />
          </motion.button>
        </motion.div>

        {/* Music Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-slate-200 pt-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.div
              className={`p-2 rounded-full transition-colors ${
                audioPlaying
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 text-primary-600'
              }`}
            >
              <Music size={20} />
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-700">Lofi Chill Beats</p>
              <p className="text-xs text-slate-500">
                {audioPlaying ? 'Đang phát...' : 'Nhấn để nghe'}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAudioPlaying(!audioPlaying)}
            className="text-primary-600 font-bold text-sm bg-primary-50 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors"
          >
            {audioPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FocusTimer;
