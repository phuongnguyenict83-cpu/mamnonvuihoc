import React from 'react';
import { motion } from 'motion/react';
import { Dog, Palette, Hash, Play } from 'lucide-react';
import { GameType } from '../types';

interface HomeProps {
  onStartGame: (type: GameType) => void;
}

export default function Home({ onStartGame }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100 p-6">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-sky-600 mb-4 drop-shadow-sm">
          Mầm non Vui học 🎨
        </h1>
        <p className="text-xl text-sky-800 font-medium">
          Chào mừng các bé đến với thế giới học tập vui nhộn!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <GameCard 
          title="Thế giới Động vật" 
          icon={<Dog className="w-12 h-12 text-orange-500" />}
          color="bg-orange-100 border-orange-300 hover:bg-orange-200"
          onClick={() => onStartGame('animals')}
        />
        <GameCard 
          title="Sắc màu Kỳ diệu" 
          icon={<Palette className="w-12 h-12 text-purple-500" />}
          color="bg-purple-100 border-purple-300 hover:bg-purple-200"
          onClick={() => onStartGame('colors')}
        />
        <GameCard 
          title="Bé tập Đếm số" 
          icon={<Hash className="w-12 h-12 text-green-500" />}
          color="bg-green-100 border-green-300 hover:bg-green-200"
          onClick={() => onStartGame('numbers')}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-12 px-8 py-4 bg-sky-500 text-white rounded-full font-bold text-xl shadow-lg flex items-center gap-2"
        onClick={() => onStartGame('animals')}
      >
        <Play className="fill-current" />
        Bắt đầu chơi ngay!
      </motion.button>
    </div>
  );
}

function GameCard({ title, icon, color, onClick }: { title: string, icon: React.ReactNode, color: string, onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-pointer p-8 rounded-3xl border-4 flex flex-col items-center gap-4 shadow-md transition-colors ${color}`}
      onClick={onClick}
    >
      <div className="p-4 bg-white rounded-full shadow-inner">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 text-center">{title}</h2>
    </motion.div>
  );
}
