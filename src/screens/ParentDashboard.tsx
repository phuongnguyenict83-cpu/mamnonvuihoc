import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, TrendingUp, MessageCircle, Settings, Star, Utensils, Users, BookOpen, Heart, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function ParentDashboard({ 
  onBack, 
  stars = 0, 
  emotionHistory = [],
  speak
}: { 
  onBack: () => void, 
  stars?: number,
  emotionHistory?: {emotion: string, date: string, feedback: string}[],
  speak: (text: string) => void
}) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'nutrition' | 'community' | 'teacher' | 'emotions'>('overview');

  const nutritionMenu = [
    { day: 'Thứ 2', breakfast: 'Cháo yến mạch sữa tươi', lunch: 'Cơm, cá hồi kho, canh bí đỏ', snack: 'Sữa chua trái cây', cal: 1200 },
    { day: 'Thứ 3', breakfast: 'Bánh mì kẹp trứng', lunch: 'Cơm, thịt heo luộc, canh rau ngót', snack: 'Nước cam ép', cal: 1150 },
    { day: 'Thứ 4', breakfast: 'Phở bò', lunch: 'Cơm, tôm rim, canh mướp đắng', snack: 'Chuối chín', cal: 1250 },
    { day: 'Thứ 5', breakfast: 'Súp gà ngô ngọt', lunch: 'Cơm, đậu phụ sốt cà chua, canh cải', snack: 'Váng sữa', cal: 1180 },
    { day: 'Thứ 6', breakfast: 'Bún mọc', lunch: 'Cơm, gà chiên nước mắm, canh bí xanh', snack: 'Táo', cal: 1220 },
  ];

  const communityPosts = [
    { id: 1, author: 'Mẹ Bé Bún', content: 'Có mẹ nào biết cách dạy bé học số nhanh không ạ? Bé nhà mình hơi lười học số.', likes: 12, comments: 5 },
    { id: 2, author: 'Ba Bé Gấu', content: 'Thực đơn tuần này của app hay quá, bé nhà mình rất thích món cá hồi kho.', likes: 24, comments: 2 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="h-full w-full flex flex-col bg-slate-50 overflow-y-auto"
    >
      <div className="flex items-center justify-between p-6 bg-white shadow-sm sticky top-0 z-10">
        <Button variant="outline" size="icon" onClick={() => {
          onBack();
          speak("Quay lại");
        }} className="rounded-full">
          <ArrowLeft size={24} />
        </Button>
        <h2 className="text-2xl font-black text-slate-700">Phụ Huynh</h2>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => speak("Cài đặt")}>
          <Settings size={24} />
        </Button>
      </div>

      {/* Sub-tabs Navigation */}
      <div className="flex bg-white px-6 py-2 border-b overflow-x-auto no-scrollbar gap-4 sticky top-[80px] z-10">
        {[
          { id: 'overview', label: 'Tổng quan', icon: <TrendingUp size={18} /> },
          { id: 'nutrition', label: 'Dinh dưỡng', icon: <Utensils size={18} /> },
          { id: 'community', label: 'Cộng đồng', icon: <Users size={18} /> },
          { id: 'emotions', label: 'Cảm xúc', icon: <Heart size={18} /> },
          { id: 'teacher', label: 'Góc tâm sự', icon: <MessageCircle size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSubTab(tab.id as any);
              speak(tab.label);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeSubTab === tab.id ? 'bg-sky-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 flex flex-col gap-6 pb-24">
        <AnimatePresence mode="wait">
          {activeSubTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-500">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Thời gian học hôm nay</p>
                    <h3 className="text-3xl font-black text-slate-800">45 <span className="text-xl font-bold text-slate-400">phút</span></h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
                    <Star size={32} className="fill-yellow-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Ngôi sao bé đạt được</p>
                    <h3 className="text-3xl font-black text-slate-800">{stars} <span className="text-xl font-bold text-slate-400">sao</span></h3>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-700">Tiến độ học tập</h3>
                </div>
                
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Học chữ', progress: 80, color: 'bg-sky-500' },
                    { label: 'Học số', progress: 65, color: 'bg-yellow-500' },
                    { label: 'Sáng tạo', progress: 90, color: 'bg-emerald-500' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                        <span>{item.label}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'nutrition' && (
            <motion.div key="nutrition" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <Utensils className="text-orange-500" /> Thực đơn dinh dưỡng tuần này
                </h3>
                <div className="flex flex-col gap-4">
                  {nutritionMenu.map((item) => (
                    <div key={item.day} className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-orange-800">{item.day}</span>
                        <span className="text-sm font-bold text-orange-600 bg-white px-3 py-1 rounded-full shadow-sm">{item.cal} kcal</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <p><span className="font-bold">Sáng:</span> {item.breakfast}</p>
                        <p><span className="font-bold">Trưa:</span> {item.lunch}</p>
                        <p><span className="font-bold">Phụ:</span> {item.snack}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'community' && (
            <motion.div key="community" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <Users className="text-sky-500" /> Cộng đồng Cha mẹ thông thái
                </h3>
                <div className="flex flex-col gap-4">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center text-xs font-bold text-sky-700">
                          {post.author[0]}
                        </div>
                        <span className="font-bold text-slate-700">{post.author}</span>
                      </div>
                      <p className="text-slate-600 mb-4">{post.content}</p>
                      <div className="flex gap-4 text-sm font-bold text-slate-400">
                        <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                          <Heart size={16} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-sky-500 transition-colors">
                          <MessageCircle size={16} /> {post.comments}
                        </button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full rounded-2xl py-6 text-lg font-black bg-sky-500 hover:bg-sky-600">
                    Đăng câu hỏi mới
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'emotions' && (
            <motion.div key="emotions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <Heart className="text-rose-500" /> Nhật ký cảm xúc của bé
                </h3>
                
                {emotionHistory.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {emotionHistory.map((record, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {record.emotion === 'vui' ? '😊' : record.emotion === 'buon' ? '😢' : '😠'}
                            </span>
                            <span className="font-bold text-slate-700 capitalize">
                              {record.emotion === 'vui' ? 'Vui vẻ' : record.emotion === 'buon' ? 'Buồn bã' : 'Tức giận'}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-400">
                            {new Date(record.date).toLocaleDateString('vi-VN')} {new Date(record.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 italic">"{record.feedback}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">🌈</span>
                    <p className="text-slate-500 font-bold">Bé chưa ghi lại cảm xúc nào hôm nay.</p>
                  </div>
                )}
              </div>

              {emotionHistory.length > 0 && (
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-6 rounded-3xl shadow-lg text-white">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <TrendingUp /> Phân tích từ AI
                  </h3>
                  <p className="font-bold opacity-90 leading-relaxed">
                    Dựa trên lịch sử cảm xúc, bé đang có trạng thái tâm lý khá ổn định. 
                    {emotionHistory.filter(r => r.emotion === 'vui').length > emotionHistory.length / 2 
                      ? " Bé thường xuyên cảm thấy vui vẻ khi học tập. Đây là dấu hiệu rất tốt!" 
                      : " Bé có một vài khoảnh khắc chưa vui, phụ huynh hãy dành thêm thời gian trò chuyện cùng bé nhé."}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeSubTab === 'teacher' && (
            <motion.div key="teacher" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <MessageCircle className="text-purple-500" /> Góc tâm sự cùng cô
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 mb-4">
                    <p className="text-slate-700 leading-relaxed">
                      "Bé hôm nay rất ngoan và đã nhận biết được các chữ cái A, B, C. Phụ huynh nhớ ôn tập thêm cho bé ở nhà nhé!"
                    </p>
                    <p className="text-sm text-slate-400 mt-2 font-medium">- Cô Nga, 14:30 Hôm nay</p>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Nhắn tin cho cô..."
                      className="flex-1 bg-slate-100 rounded-full px-6 py-3 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <Button size="icon" className="rounded-full bg-purple-500 hover:bg-purple-600">
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

