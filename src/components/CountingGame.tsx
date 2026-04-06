import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, CheckCircle, XCircle, Star } from 'lucide-react';
import { NUMBERS } from '../constants';
import { NumberItem } from '../types';
import { speakText } from '../services/geminiService';

interface CountingGameProps {
  onBack: () => void;
}

export default function CountingGame({ onBack }: CountingGameProps) {
  const [currentNumber, setCurrentNumber] = useState<NumberItem | null>(null);
  const [options, setOptions] = useState<NumberItem[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

  const startNewRound = () => {
    const shuffled = [...NUMBERS].sort(() => Math.random() - 0.5);
    const selected = shuffled[0];
    const roundOptions = shuffled.slice(0, 3).sort(() => Math.random() - 0.5);
    
    setCurrentNumber(selected);
    setOptions(roundOptions);
    setFeedback(null);
    
    speakText(`Bé hãy đếm xem có bao nhiêu ngôi sao nhé!`);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleOptionClick = (num: NumberItem) => {
    if (num.id === currentNumber?.id) {
      setFeedback('correct');
      setScore(s => s + 1);
      speakText(`Đúng rồi! Có ${num.value} ngôi sao. Bé giỏi quá!`);
      setTimeout(startNewRound, 3000);
    } else {
      setFeedback('incorrect');
      speakText(`Chưa đúng rồi, bé thử lại nhé!`);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white rounded-full shadow-md hover:bg-green-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-green-600" />
        </button>
        <div className="bg-white px-6 py-2 rounded-full shadow-md font-bold text-green-600 text-xl">
          Điểm: {score}
        </div>
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-4">Bé tập đếm số!</h1>
        <div className="flex items-center justify-center gap-4">
          <p className="text-2xl text-green-800 font-medium italic">
            "Bé hãy đếm xem có bao nhiêu ngôi sao nhé!"
          </p>
          <button 
            onClick={() => speakText(`Bé hãy đếm xem có bao nhiêu ngôi sao nhé!`)}
            className="p-2 bg-green-200 rounded-full hover:bg-green-300 transition-colors"
          >
            <Volume2 className="w-6 h-6 text-green-700" />
          </button>
        </div>
      </motion.div>

      <div className="bg-white p-12 rounded-3xl shadow-xl mb-12 flex flex-wrap justify-center gap-6 max-w-2xl border-4 border-green-200">
        {Array.from({ length: currentNumber?.value || 0 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
          >
            <Star className="w-16 h-16 text-yellow-400 fill-current drop-shadow-md" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 w-full max-w-2xl">
        {options.map((num) => (
          <motion.div
            key={num.id}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer bg-white p-8 rounded-3xl shadow-lg border-4 border-transparent hover:border-green-400 transition-all flex flex-col items-center justify-center"
            onClick={() => handleOptionClick(num)}
          >
            <span className="text-5xl font-black text-green-600">{num.value}</span>
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
