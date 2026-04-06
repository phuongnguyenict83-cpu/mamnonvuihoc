import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { COLORS } from '../constants';
import { Color } from '../types';
import { speakText } from '../services/geminiService';

interface ColorGameProps {
  onBack: () => void;
}

export default function ColorGame({ onBack }: ColorGameProps) {
  const [currentColor, setCurrentColor] = useState<Color | null>(null);
  const [options, setOptions] = useState<Color[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

  const startNewRound = () => {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const selected = shuffled[0];
    const roundOptions = shuffled.slice(0, 3).sort(() => Math.random() - 0.5);
    
    setCurrentColor(selected);
    setOptions(roundOptions);
    setFeedback(null);
    
    speakText(`Bé hãy tìm ${selected.name} nhé!`);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleOptionClick = (color: Color) => {
    if (color.id === currentColor?.id) {
      setFeedback('correct');
      setScore(s => s + 1);
      speakText(`Đúng rồi! Đây là ${color.name}. Bé giỏi quá!`);
      setTimeout(startNewRound, 3000);
    } else {
      setFeedback('incorrect');
      speakText(`Chưa đúng rồi, bé thử lại nhé!`);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white rounded-full shadow-md hover:bg-purple-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-600" />
        </button>
        <div className="bg-white px-6 py-2 rounded-full shadow-md font-bold text-purple-600 text-xl">
          Điểm: {score}
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Tìm màu sắc nào!</h1>
        <div className="flex items-center justify-center gap-4">
          <p className="text-2xl text-purple-800 font-medium italic">
            "Bé hãy tìm {currentColor?.name} nhé!"
          </p>
          <button 
            onClick={() => speakText(`Bé hãy tìm ${currentColor?.name} nhé!`)}
            className="p-2 bg-purple-200 rounded-full hover:bg-purple-300 transition-colors"
          >
            <Volume2 className="w-6 h-6 text-purple-700" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
        {options.map((color) => (
          <motion.div
            key={color.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-white p-8 rounded-3xl shadow-lg border-4 border-transparent hover:border-purple-400 transition-all flex flex-col items-center gap-4"
            onClick={() => handleOptionClick(color)}
          >
            <div 
              className="w-full aspect-square rounded-full shadow-inner border-4 border-white"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-2xl font-bold text-gray-800">{color.name}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`fixed bottom-12 px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 text-white font-bold text-2xl ${
              feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {feedback === 'correct' ? (
              <>
                <CheckCircle className="w-8 h-8" />
                Tuyệt vời! Bé giỏi quá!
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8" />
                Bé thử lại nhé!
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
