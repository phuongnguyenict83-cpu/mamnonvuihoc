import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ArrowLeft, X, Sparkles, Trophy, Star, Mic, Square, Video, Image as ImageIcon } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { GoogleGenAI } from '@google/genai';
import { MATH_GAMES_DATA } from './constants/mathData';
import MathGame from './components/MathGame';
import ParentDashboard from './screens/ParentDashboard';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ANIMALS = [
  { id: 'dog', name: 'Con Chó', emoji: '🐶', color: 'bg-orange-200' },
  { id: 'cat', name: 'Con Mèo', emoji: '🐱', color: 'bg-yellow-200' },
  { id: 'chicken', name: 'Con Gà', emoji: '🐔', color: 'bg-red-200' },
  { id: 'duck', name: 'Con Vịt', emoji: '🦆', color: 'bg-green-200' },
  { id: 'pig', name: 'Con Lợn', emoji: '🐷', color: 'bg-pink-200' },
  { id: 'cow', name: 'Con Bò', emoji: '🐮', color: 'bg-stone-200' },
  { id: 'monkey', name: 'Con Khỉ', emoji: '🐵', color: 'bg-amber-200' },
  { id: 'elephant', name: 'Con Voi', emoji: '🐘', color: 'bg-slate-200' },
  { id: 'tiger', name: 'Con Hổ', emoji: '🐯', color: 'bg-orange-300' },
  { id: 'lion', name: 'Sư Tử', emoji: '🦁', color: 'bg-yellow-300' },
];

const COLORS = [
  { id: 'red', name: 'Màu Đỏ', hex: '#EF4444', color: 'bg-red-100' },
  { id: 'green', name: 'Màu Xanh Lá', hex: '#22C55E', color: 'bg-green-100' },
  { id: 'blue', name: 'Màu Xanh Dương', hex: '#3B82F6', color: 'bg-blue-100' },
  { id: 'yellow', name: 'Màu Vàng', hex: '#EAB308', color: 'bg-yellow-100' },
  { id: 'orange', name: 'Màu Cam', hex: '#F97316', color: 'bg-orange-100' },
  { id: 'purple', name: 'Màu Tím', hex: '#A855F7', color: 'bg-purple-100' },
  { id: 'pink', name: 'Màu Hồng', hex: '#EC4899', color: 'bg-pink-100' },
  { id: 'black', name: 'Màu Đen', hex: '#000000', color: 'bg-slate-200' },
  { id: 'white', name: 'Màu Trắng', hex: '#FFFFFF', color: 'bg-slate-50' },
];

const NUMBER_NAMES = ['Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười'];
const NUMBERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `${i + 1} – ${NUMBER_NAMES[i]}`,
  value: i + 1,
  emoji: '🌟',
  color: 'bg-sky-200'
}));

const LETTERS = [
  { id: 'A', name: 'A a – A là quả táo', word: 'Quả Táo', emoji: '🍎', color: 'bg-red-100' },
  { id: 'Ă', name: 'Ă ă – Ă là mặt trăng', word: 'Mặt Trăng', emoji: '🌙', color: 'bg-yellow-100' },
  { id: 'Â', name: 'Â â – Â là cái ấm', word: 'Cái Ấm', emoji: '🫖', color: 'bg-orange-100' },
  { id: 'B', name: 'B b – B là quả bóng', word: 'Quả Bóng', emoji: '⚽', color: 'bg-blue-100' },
  { id: 'C', name: 'C c – C là con cáo', word: 'Con Cáo', emoji: '🦊', color: 'bg-orange-200' },
  { id: 'D', name: 'D d – D là con dê', word: 'Con Dê', emoji: '🐐', color: 'bg-stone-100' },
  { id: 'Đ', name: 'Đ đ – Đ là đám mây', word: 'Đám Mây', emoji: '☁️', color: 'bg-sky-100' },
  { id: 'E', name: 'E e – E là con én', word: 'Con Én', emoji: '🐦', color: 'bg-sky-200' },
  { id: 'Ê', name: 'Ê ê – Ê là con ếch', word: 'Con Ếch', emoji: '🐸', color: 'bg-green-100' },
  { id: 'G', name: 'G g – G là con gà', word: 'Con Gà', emoji: '🐔', color: 'bg-yellow-200' },
  { id: 'H', name: 'H h – H là hoa hồng', word: 'Hoa Hồng', emoji: '🌹', color: 'bg-pink-100' },
  { id: 'I', name: 'I i – I là viên bi', word: 'Viên Bi', emoji: '🔮', color: 'bg-purple-100' },
  { id: 'K', name: 'K k – K là cái kéo', word: 'Cái Kéo', emoji: '✂️', color: 'bg-slate-100' },
  { id: 'L', name: 'L l – L là cái lá', word: 'Cái Lá', emoji: '🍃', color: 'bg-green-200' },
  { id: 'M', name: 'M m – M là con mèo', word: 'Con Mèo', emoji: '🐱', color: 'bg-amber-100' },
  { id: 'N', name: 'N n – N là cái nón', word: 'Cái Nón', emoji: '👒', color: 'bg-emerald-100' },
  { id: 'O', name: 'O o – O là con ong', word: 'Con Ong', emoji: '🐝', color: 'bg-yellow-300' },
  { id: 'Ô', name: 'Ô ô – Ô là cái ô', word: 'Cái Ô', emoji: '☂️', color: 'bg-purple-200' },
  { id: 'Ơ', name: 'Ơ ơ – Ơ là cái nơ', word: 'Cái Nơ', emoji: '🎀', color: 'bg-pink-200' },
  { id: 'P', name: 'P p – P là pháo hoa', word: 'Pháo Hoa', emoji: '🎆', color: 'bg-red-200' },
  { id: 'Q', name: 'Q q – Q là quyển sách', word: 'Quyển Sách', emoji: '📖', color: 'bg-blue-200' },
  { id: 'R', name: 'R r – R là con rùa', word: 'Con Rùa', emoji: '🐢', color: 'bg-green-300' },
  { id: 'S', name: 'S s – S là ngôi sao', word: 'Ngôi Sao', emoji: '⭐', color: 'bg-yellow-400' },
  { id: 'T', name: 'T t – T là trái tim', word: 'Trái Tim', emoji: '❤️', color: 'bg-red-300' },
  { id: 'U', name: 'U u – U là quả đu đủ', word: 'Đu Đủ', emoji: '🥭', color: 'bg-orange-300' },
  { id: 'Ư', name: 'Ư ư – Ư là sư tử', word: 'Sư Tử', emoji: '🦁', color: 'bg-amber-200' },
  { id: 'V', name: 'V v – V là con voi', word: 'Con Voi', emoji: '🐘', color: 'bg-slate-200' },
  { id: 'X', name: 'X x – X là xe đạp', word: 'Xe Đạp', emoji: '🚲', color: 'bg-sky-300' },
  { id: 'Y', name: 'Y y – Y là y tá', word: 'Y Tá', emoji: '👩‍⚕️', color: 'bg-pink-300' },
];

const ENGLISH_LETTERS = [
  { id: 'A', name: 'Chữ A tiếng Anh. Apple, quả táo', word: 'Apple', emoji: '🍎', color: 'bg-red-100' },
  { id: 'B', name: 'Chữ B tiếng Anh. Ball, quả bóng', word: 'Ball', emoji: '⚽', color: 'bg-blue-100' },
  { id: 'C', name: 'Chữ C tiếng Anh. Cat, con mèo', word: 'Cat', emoji: '🐱', color: 'bg-orange-100' },
  { id: 'D', name: 'Chữ D tiếng Anh. Dog, con chó', word: 'Dog', emoji: '🐶', color: 'bg-stone-100' },
  { id: 'E', name: 'Chữ E tiếng Anh. Elephant, con voi', word: 'Elephant', emoji: '🐘', color: 'bg-slate-200' },
  { id: 'F', name: 'Chữ F tiếng Anh. Fish, con cá', word: 'Fish', emoji: '🐟', color: 'bg-sky-100' },
  { id: 'G', name: 'Chữ G tiếng Anh. Giraffe, hươu cao cổ', word: 'Giraffe', emoji: '🦒', color: 'bg-yellow-100' },
  { id: 'H', name: 'Chữ H tiếng Anh. Hat, cái mũ', word: 'Hat', emoji: '🎩', color: 'bg-purple-100' },
  { id: 'I', name: 'Chữ I tiếng Anh. Ice cream, cây kem', word: 'Ice cream', emoji: '🍦', color: 'bg-pink-100' },
  { id: 'J', name: 'Chữ J tiếng Anh. Juice, nước ép', word: 'Juice', emoji: '🧃', color: 'bg-orange-200' },
  { id: 'K', name: 'Chữ K tiếng Anh. Kite, cái diều', word: 'Kite', emoji: '🪁', color: 'bg-red-200' },
  { id: 'L', name: 'Chữ L tiếng Anh. Lion, sư tử', word: 'Lion', emoji: '🦁', color: 'bg-yellow-200' },
  { id: 'M', name: 'Chữ M tiếng Anh. Monkey, con khỉ', word: 'Monkey', emoji: '🐵', color: 'bg-amber-100' },
  { id: 'N', name: 'Chữ N tiếng Anh. Nest, cái tổ', word: 'Nest', emoji: '🪹', color: 'bg-stone-200' },
  { id: 'O', name: 'Chữ O tiếng Anh. Orange, quả cam', word: 'Orange', emoji: '🍊', color: 'bg-orange-300' },
  { id: 'P', name: 'Chữ P tiếng Anh. Pig, con lợn', word: 'Pig', emoji: '🐷', color: 'bg-pink-200' },
  { id: 'Q', name: 'Chữ Q tiếng Anh. Queen, nữ hoàng', word: 'Queen', emoji: '👑', color: 'bg-yellow-300' },
  { id: 'R', name: 'Chữ R tiếng Anh. Rabbit, con thỏ', word: 'Rabbit', emoji: '🐰', color: 'bg-slate-100' },
  { id: 'S', name: 'Chữ S tiếng Anh. Sun, mặt trời', word: 'Sun', emoji: '☀️', color: 'bg-yellow-400' },
  { id: 'T', name: 'Chữ T tiếng Anh. Tiger, con hổ', word: 'Tiger', emoji: '🐯', color: 'bg-orange-400' },
  { id: 'U', name: 'Chữ U tiếng Anh. Umbrella, cái ô', word: 'Umbrella', emoji: '☂️', color: 'bg-purple-200' },
  { id: 'V', name: 'Chữ V tiếng Anh. Van, xe tải', word: 'Van', emoji: '🚐', color: 'bg-sky-200' },
  { id: 'W', name: 'Chữ W tiếng Anh. Watermelon, dưa hấu', word: 'Watermelon', emoji: '🍉', color: 'bg-red-300' },
  { id: 'X', name: 'Chữ X tiếng Anh. Xylophone, đàn mộc cầm', word: 'Xylophone', emoji: '🎹', color: 'bg-indigo-200' },
  { id: 'Y', name: 'Chữ Y tiếng Anh. Yo-yo, con quay', word: 'Yo-yo', emoji: '🪀', color: 'bg-pink-300' },
  { id: 'Z', name: 'Chữ Z tiếng Anh. Zebra, ngựa vằn', word: 'Zebra', emoji: '🦓', color: 'bg-slate-300' },
];

const STORIES_TODDLER = [
  { id: 'story-de-con', name: 'Truyện Dê con nghe lời mẹ', emoji: '🐐', color: 'bg-white', videoId: 'xsIJhCXpo38' },
  { id: 'story-khi-con', name: 'Truyện Khỉ con biết vâng lời', emoji: '🐵', color: 'bg-white', videoId: 'tlRfa4EdVuY' },
  { id: 'story-lon-luoi-tam', name: 'Truyện bạn lợn lười tắm', emoji: '🐷', color: 'bg-white', videoId: 'U32RFia273U' },
  { id: 'story-cun-con-lac', name: 'Truyện Cún con đi lạc', emoji: '🐶', color: 'bg-white', videoId: 'urGVqzUkX0w' },
  { id: 'story-vit-con-cau-tha', name: 'Truyện Vịt con cẩu thả', emoji: '🦆', color: 'bg-white', videoId: 'gvjn4WgcJeU' },
  { id: 'story-khi-chuoi', name: 'Truyện Khỉ con ăn chuối', emoji: '🍌', color: 'bg-white', videoId: 'Wky2zmjgc9A' },
  { id: 'story-soc-nau', name: 'Truyện Sóc nâu nhanh trí', emoji: '🐿️', color: 'bg-white', videoId: 'GU2XW8ki3UU' },
  { id: 'story-mat-troi-dau', name: 'Truyện Ông mặt trời đi đâu?', emoji: '☀️', color: 'bg-white', videoId: '6AdRHklkEbk' },
  { id: 'story-ga-mai-hoa-mo', name: 'Truyện Gà mái hoa mơ', emoji: '🐔', color: 'bg-white', videoId: 'N4SN5Rqgrj0' },
  { id: 'story-meo-an-ca', name: 'Truyện Mèo thích ăn cá', emoji: '🐱', color: 'bg-white', videoId: 'zdDhakQMp9I' },
];

const POEMS_TODDLER = [
  { id: 'poem-yeu-me', name: 'Thơ Yêu mẹ', emoji: '👩‍👦', color: 'bg-white', videoId: 'BAm8rYzharo' },
  { id: 'poem-muoi-qua-trung', name: 'Thơ Mười quả trứng tròn', emoji: '🥚', color: 'bg-white', videoId: '1D3l11Dk36A' },
  { id: 'poem-bap-cai', name: 'Thơ Bắp cải xanh', emoji: '🥬', color: 'bg-white', videoId: '_vsnY8NQntA' },
  { id: 'poem-dan-ga-con', name: 'Thơ đàn gà con', emoji: '🐥', color: 'bg-white', videoId: 'ExppIHdWZ94' },
  { id: 'poem-con-ca-vang', name: 'Thơ con cá vàng', emoji: '🐠', color: 'bg-white', videoId: 'ygZzGo_Yh-U' },
  { id: 'poem-ba-chau', name: 'Thơ Bà và cháu', emoji: '👵', color: 'bg-white', videoId: 'NBC1OuFlrHU' },
  { id: 'poem-lam-do-choi', name: 'Thơ Làm đồ chơi', emoji: '🧸', color: 'bg-white', videoId: '7e0krzNEwKk' },
  { id: 'poem-con-meo', name: 'Thơ Con mèo', emoji: '🐱', color: 'bg-white', videoId: 'E2NYzL2O3iI' },
  { id: 'poem-con-trau', name: 'Thơ Con trâu', emoji: '🐃', color: 'bg-white', videoId: 'SeDU1KsRLRI' },
  { id: 'poem-hoa-no', name: 'Thơ Hoa nở', emoji: '🌸', color: 'bg-white', videoId: '-ry2DDAoUXg' },
];

const STORIES_3_4 = [
  { id: 'story-tho-con-34', name: 'Truyện thỏ con không vâng lời', emoji: '🐰', color: 'bg-white', videoId: 'k_yGJGAMXqI' },
  { id: 'story-gau-con-sau-rang', name: 'Truyện gấu con bị sâu răng', emoji: '🐻', color: 'bg-white', videoId: 'yrzjrRyuDgQ' },
  { id: 'story-cau-be-mui-dai', name: 'Truyện cậu bé mũi dài', emoji: '👦', color: 'bg-white', videoId: '3SAt-tFaut8' },
  { id: 'story-vit-xam-34', name: 'Truyện chú vịt xám', emoji: '🦆', color: 'bg-white', videoId: 'EP5wypBprGM' },
  { id: 'story-kien-voi', name: 'Truyện kiến và voi', emoji: '🐘', color: 'bg-white', videoId: 'vkLqHHES6v4' },
  { id: 'story-tho-trang-biet-loi', name: 'Truyện thỏ trắng biết lỗi', emoji: '🐰', color: 'bg-white', videoId: 'l9T69QWy40s' },
  { id: 'story-nho-cu-cai', name: 'Truyện nhổ củ cải', emoji: '🥕', color: 'bg-white', videoId: 'GhFrqHTOs4A' },
  { id: 'story-hat-do-sot', name: 'Truyện hạt đỗ sót', emoji: '🌱', color: 'bg-white', videoId: 'dRi_LUlqvBM' },
  { id: 'story-rua-tim-nha', name: 'Truyện Rùa con tìm nhà', emoji: '🐢', color: 'bg-white', videoId: 'ziB1h2hWb2w' },
  { id: 'story-ca-diec', name: 'Truyện Cá diếc con', emoji: '🐟', color: 'bg-white', videoId: 'DYNEpcwMJU0' },
  { id: 'story-tich-cau-vong', name: 'Truyện Sự tích cầu vồng', emoji: '🌈', color: 'bg-white', videoId: 'ctku7Eacv-w' },
  { id: 'story-tieng-keu-coc', name: 'Truyện Tiếng kêu của Cóc con', emoji: '🐸', color: 'bg-white', videoId: 'KFvDbpjDSOg' },
  { id: 'story-ga-to-di-hoc', name: 'Truyện Gà tơ đi học', emoji: '🐔', color: 'bg-white', videoId: 'aLYqgek-E7I' },
];

const POEMS_3_4 = [
  { id: 'poem-cay-day-leo', name: 'Thơ cây dây leo', emoji: '🌿', color: 'bg-white', videoId: 'klTtM_HYOwc' },
  { id: 'poem-meo-con-luoi-hoc', name: 'Thơ mèo con lười học', emoji: '🐱', color: 'bg-white', videoId: 'X8E4B9dIGfM' },
  { id: 'poem-xe-chua-chay', name: 'Thơ xe chữa cháy', emoji: '🚒', color: 'bg-white', videoId: 'g_mBx9nI8EI' },
  { id: 'poem-chiec-dong-ho', name: 'Thơ chiếc đồng hồ', emoji: '⏰', color: 'bg-white', videoId: '7gswsKyVCd4' },
  { id: 'poem-di-choi-pho', name: 'Thơ đi chơi phố', emoji: '🚶', color: 'bg-white', videoId: 's-_Kqm7PoUs' },
  { id: 'poem-doi-mat', name: 'Thơ Đôi mắt của em', emoji: '👀', color: 'bg-white', videoId: 'ghDu7kTnqh8' },
  { id: 'poem-gio-tay-me', name: 'Thơ Gió từ tay mẹ', emoji: '🌬️', color: 'bg-white', videoId: 'FiWCLgjNPmQ' },
  { id: 'poem-ong-mat-troi', name: 'Thơ Ông mặt trời', emoji: '☀️', color: 'bg-white', videoId: 'L4SK5nvF7GI' },
  { id: 'poem-ga-trong-nho', name: 'Thơ Chú gà trống nhỏ', emoji: '🐓', color: 'bg-white', videoId: 'ZrfeRB871qM' },
  { id: 'poem-chum-qua-ngot', name: 'Thơ Chùm quả ngọt', emoji: '🍇', color: 'bg-white', videoId: 'OIX7SvDYwj0' },
  { id: 'poem-ban-tay-co', name: 'Thơ Bàn tay cô giáo', emoji: '👩‍🏫', color: 'bg-white', videoId: 'k5pK-2kE0fY' },
];

const STORIES_4_5 = [
  { id: 'story-ba-chu-heo', name: 'Truyện ba chú heo con', emoji: '🐷', color: 'bg-white', videoId: 'SN3X37995sY' },
  { id: 'story-kien-con', name: 'Truyện kiến con đi xe ô tô', emoji: '🐜', color: 'bg-white', videoId: 'eCy7Nf-OS6w' },
  { id: 'story-qua-duong', name: 'Truyện qua đường', emoji: '🚦', color: 'bg-white', videoId: '8bpeIXJhBsQ' },
  { id: 'story-ga-to', name: 'Truyện gà tơ đi học', emoji: '🐔', color: 'bg-white', videoId: 'Qd7AJMyiBOA' },
  { id: 'story-doi-ban-nho', name: 'Truyện đôi bạn nhỏ', emoji: '🐥', color: 'bg-white', videoId: '7qqqYaymunw' },
  { id: 'story-nguoi-lam-vuon', name: 'Truyện Người làm vườn và các con trai', emoji: '👨‍🌾', color: 'bg-white', videoId: '6sqywI2t72Y' },
  { id: 'story-than-sat', name: 'Truyện Thần sắt', emoji: '⛓️', color: 'bg-white', videoId: '5Iqei2eUa3k' },
  { id: 'story-dua-hau', name: 'Truyện Sự tích quả dưa hấu', emoji: '🍉', color: 'bg-white', videoId: 'LgGyYi6GSwg' },
  { id: 'story-ga-trong-hat-dau', name: 'Truyện Gà trống choai và hạt đậu', emoji: '🐓', color: 'bg-white', videoId: 'Vruz3CFwAUk' },
  { id: 'story-dom-dom', name: 'Truyện Đom đóm tìm bạn', emoji: '🪲', color: 'bg-white', videoId: '2adQgxMlGbk' },
];

const POEMS_4_5 = [
  { id: 'poem-yeu-nha', name: 'Thơ em yêu nhà em', emoji: '🏠', color: 'bg-white', videoId: 'bveP0xXCk8E' },
  { id: 'poem-tham-nha-ba', name: 'Thơ Thăm nhà bà', emoji: '👵', color: 'bg-white', videoId: 'ru9JiNz2MM0' },
  { id: 'poem-trang-sang', name: 'Thơ trăng sáng', emoji: '🌕', color: 'bg-white', videoId: 'JnyshnzVWZQ' },
  { id: 'poem-co-day', name: 'Thơ cô dạy', emoji: '👩‍🏫', color: 'bg-white', videoId: 'mzqt0ixm3Gg' },
  { id: 'poem-ban-moi', name: 'Thơ bạn mới', emoji: '🤝', color: 'bg-white', videoId: '-tdFOnOtIOY' },
  { id: 'poem-bac-ho', name: 'Thơ bác hồ của em', emoji: '👴', color: 'bg-white', videoId: 'UkOLAsXYTsE' },
  { id: 'poem-bao-nhieu-nghe', name: 'Thơ Bé làm bao nhiêu nghề', emoji: '👷', color: 'bg-white', videoId: '1bgMCqUK1Yg' },
  { id: 'poem-tinh-ban', name: 'Thơ Tình bạn', emoji: '🤝', color: 'bg-white', videoId: 'BtbfU_l-Hc0' },
  { id: 'poem-be-hoa-si', name: 'Thơ Bé làm hoạ sĩ', emoji: '🎨', color: 'bg-white', videoId: 'IEGnxsXeGuA' },
  { id: 'poem-trung-thu', name: 'Thơ Trung thu cùng bé', emoji: '🏮', color: 'bg-white', videoId: 'dWoVvVFqEU4' },
  { id: 'poem-lay-tam', name: 'Thơ Lấy tăm cho bà', emoji: '👵', color: 'bg-white', videoId: 'My_PLuT9YFg' },
];

const STORIES_5_6 = [
  { id: 'story-cuc-trang', name: 'Truyện Bông hoa cúc trắng', emoji: '🌼', color: 'bg-white', videoId: 'M0PvCVEB528' },
  { id: 'story-tich-chu', name: 'Truyện Tích Chu', emoji: '👵', color: 'bg-white', videoId: '-1PNXyqhYJ0' },
  { id: 'story-cao-tho-ga', name: 'Truyện Cáo thỏ và gà trống', emoji: '🦊', color: 'bg-white', videoId: 'd1_bDMWj87Y' },
  { id: 'story-rua-tho', name: 'Truyện rùa và thỏ', emoji: '🐢', color: 'bg-white', videoId: 'tQVCQnsaiYc' },
  { id: 'story-khan-do', name: 'Truyện cô bé quàng khăn đỏ', emoji: '👧', color: 'bg-white', videoId: 'rABQi4W14j8' },
  { id: 'story-cay-khe', name: 'Truyện sự tích cây khế', emoji: '🌳', color: 'bg-white', videoId: '6aybCaXkfpU' },
  { id: 'story-giot-nuoc', name: 'Truyện giọt nước tí xíu', emoji: '💧', color: 'bg-white', videoId: 'R9V7Iv6x_S8' },
  { id: 'story-ba-chu-heo', name: 'Truyện ba chú heo con', emoji: '🐷', color: 'bg-white', videoId: 'SN3X37995sY' },
  { id: 'story-kien-con', name: 'Truyện kiến con đi xe ô tô', emoji: '🐜', color: 'bg-white', videoId: 'eCy7Nf-OS6w' },
  { id: 'story-qua-duong', name: 'Truyện qua đường', emoji: '🚦', color: 'bg-white', videoId: '8bpeIXJhBsQ' },
  { id: 'story-ga-to', name: 'Truyện gà tơ đi học', emoji: '🐔', color: 'bg-white', videoId: 'Qd7AJMyiBOA' },
  { id: 'story-doi-ban-nho', name: 'Truyện đôi bạn nhỏ', emoji: '🐥', color: 'bg-white', videoId: '7qqqYaymunw' },
  { id: 'story-ban-tay-hon', name: 'Truyện Bàn tay có nụ hôn', emoji: '🤝', color: 'bg-white', videoId: 'lJtY5i-rgYI' },
  { id: 'story-ca-ro-con', name: 'Truyện Cá rô con không vâng lời mẹ', emoji: '🐟', color: 'bg-white', videoId: '8_EQU-rRq-M' },
  { id: 'story-con-hieu-thao', name: 'Truyện Người con hiếu thảo', emoji: '👵', color: 'bg-white', videoId: 'VSH-nDHRt-0' },
  { id: 'story-tich-ngay-dem', name: 'Truyện Sự tích ngày và đêm', emoji: '🌞🌛', color: 'bg-white', videoId: '2WpRkMFRasM' },
  { id: 'story-tich-mua-xuan', name: 'Truyện Sự tích mùa xuân', emoji: '🌸', color: 'bg-white', videoId: 'cWNT7wTufPU' },
  { id: 'story-banh-trung-giay', name: 'Truyện Sự tích bánh trưng bánh giầy', emoji: '🍱', color: 'bg-white', videoId: 'ZxLNQDzFbn0' },
];

const POEMS_5_6 = [
  { id: 'poem-meo-cau-ca', name: 'Thơ mèo đi câu cá', emoji: '🐱', color: 'bg-white', videoId: 'OzZv7DzXAhw' },
  { id: 'poem-nang-tien-oc', name: 'Thơ nàng tiên ốc', emoji: '🐚', color: 'bg-white', videoId: 'HgZu4OXOvG0' },
  { id: 'poem-anh-bac', name: 'Thơ ảnh bác', emoji: '🖼️', color: 'bg-white', videoId: 'WhplEQzu87s' },
  { id: 'poem-den-giao-thong', name: 'Thơ đèn giao thông', emoji: '🚦', color: 'bg-white', videoId: 'syqGn4qpU0c' },
  { id: 'poem-ga-hoc-chu', name: 'Thơ gà học chữ', emoji: '🐔', color: 'bg-white', videoId: 'JVc80qORa8I' },
  { id: 'poem-yeu-nha', name: 'Thơ em yêu nhà em', emoji: '🏠', color: 'bg-white', videoId: 'bveP0xXCk8E' },
  { id: 'poem-tham-nha-ba', name: 'Thơ Thăm nhà bà', emoji: '👵', color: 'bg-white', videoId: 'ru9JiNz2MM0' },
  { id: 'poem-trang-sang', name: 'Thơ trăng sáng', emoji: '🌕', color: 'bg-white', videoId: 'JnyshnzVWZQ' },
  { id: 'poem-co-day', name: 'Thơ cô dạy', emoji: '👩‍🏫', color: 'bg-white', videoId: 'mzqt0ixm3Gg' },
  { id: 'poem-ban-moi', name: 'Thơ bạn mới', emoji: '🤝', color: 'bg-white', videoId: '-tdFOnOtIOY' },
  { id: 'poem-bac-ho', name: 'Thơ bác hồ của em', emoji: '👴', color: 'bg-white', videoId: 'UkOLAsXYTsE' },
];

const LETTER_LESSONS_5_6 = [
  { id: 'lesson-itc', name: 'Làm quen chữ cái: i-t-c', emoji: '🔤', color: 'bg-white', videoId: 'T-5N4m9iiYQ' },
  { id: 'lesson-uu', name: 'Trò chơi với chữ cái u-ư', emoji: '🎮', color: 'bg-white', videoId: '73S_4_J6508' },
  { id: 'lesson-sx', name: 'Làm quen với chữ cái s x', emoji: '🔤', color: 'bg-white', videoId: 'UqQiX_fjGio' },
  { id: 'lesson-hk', name: 'Làm quen với chữ cái h-k', emoji: '🔤', color: 'bg-white', videoId: 'IHiWG5hFL7w' },
  { id: 'lesson-aaa', name: 'Làm quen chữ cái: a-ă-â', emoji: '🔤', color: 'bg-white', videoId: 'uiP7SDc5XXU' },
  { id: 'lesson-ee', name: 'Làm quen chữ cái e-ê', emoji: '🔤', color: 'bg-white', videoId: '047B0MVtZhE' },
  { id: 'lesson-pq', name: 'Làm quen chữ cái p-q', emoji: '🔤', color: 'bg-white', videoId: 'VhVnLd5nM9g' },
  { id: 'lesson-bdd', name: 'Làm quen chữ cái b-d-đ', emoji: '🔤', color: 'bg-white', videoId: '-m7CJI9iDvo' },
  { id: 'lesson-vr', name: 'Làm quen chữ cái v-r', emoji: '🔤', color: 'bg-white', videoId: 'H9E66AQtSkY' },
];

const CATEGORIES = [
  { id: 'physical', title: 'PHÁT TRIỂN THỂ CHẤT', description: 'Vận động khỏe mạnh', icon: '🏃‍♂️', color: 'bg-[#C8F7DC]', textColor: 'text-emerald-800', shadow: 'shadow-[#C8F7DC]/50' },
  { id: 'cognitive', title: 'PHÁT TRIỂN NHẬN THỨC', description: 'Khám phá và suy nghĩ', icon: '💡', color: 'bg-[#CDEBFF]', textColor: 'text-sky-800', shadow: 'shadow-[#CDEBFF]/50' },
  { id: 'language', title: 'PHÁT TRIỂN NGÔN NGỮ', description: 'Học chữ – kể chuyện', icon: '🔤', color: 'bg-[#FFF4B8]', textColor: 'text-amber-800', shadow: 'shadow-[#FFF4B8]/50' },
  { id: 'social', title: 'TÌNH CẢM - KỸ NĂNG XÃ HỘI', description: 'Yêu thương – chia sẻ', icon: '🤝', color: 'bg-[#FFD6E8]', textColor: 'text-pink-800', shadow: 'shadow-[#FFD6E8]/50' },
  { id: 'aesthetic', title: 'PHÁT TRIỂN THẨM MỸ', description: 'Sáng tạo nghệ thuật', icon: '🎨', color: 'bg-[#E5D9FF]', textColor: 'text-purple-800', shadow: 'shadow-[#E5D9FF]/50' },
];

const AGE_GROUPS = [
  { id: 'toddler', name: 'Nhà trẻ', icon: '🍼', color: 'bg-[#FFD6E8]' },
  { id: '3-4', name: '3 - 4 Tuổi', icon: '🎈', color: 'bg-[#CDEBFF]' },
  { id: '4-5', name: '4 - 5 Tuổi', icon: '🎨', color: 'bg-[#C8F7DC]' },
  { id: '5-6', name: '5 - 6 Tuổi', icon: '🎓', color: 'bg-[#FFF4B8]' },
];

const PHYSICAL_TODDLER_ACTIVITIES = [
  { id: 'tung-bong', name: 'Tung bóng bằng 2 tay', emoji: '🎾', color: 'bg-red-200', videoId: 'C9kqvRrZuvg' },
  { id: 'di-duong-hep', name: 'Đi trong đường hẹp', emoji: '🚶', color: 'bg-blue-200', videoId: 'pJPDcbmpWt8' },
  { id: 'nem-bong', name: 'Ném bóng về phía trước', emoji: '🥎', color: 'bg-green-200', videoId: 'rrr0MJPsB_M' },
  { id: 'da-bong', name: 'Đá bóng về phía trước', emoji: '⚽', color: 'bg-yellow-200', videoId: 'oRJHRm3wc5U' },
  { id: 'bo-chui-cong', name: 'Bò chui qua cổng có vật trên lưng', emoji: '🐢', color: 'bg-orange-200', videoId: 'gHEq-Nz2_HI' },
  { id: 'bat-nhay', name: 'Bật nhảy tại chỗ', emoji: '🐰', color: 'bg-purple-200', videoId: 'SnLgJpd8UUY' },
  { id: 'di-be-vat', name: 'Đi có bê vật trên tay', emoji: '📦', color: 'bg-pink-200', videoId: '4xD_a8UE0c4' },
  { id: 'di-buoc-vat-can', name: 'Đi Bước qua vật cản', emoji: '🚧', color: 'bg-sky-200', videoId: 'BN5ClqNtr6g' },
  { id: 'nem-bong-qua-day', name: 'Ném bóng qua dây', emoji: '🏐', color: 'bg-emerald-200', videoId: 'xB9qbnALZNU' },
];

const PHYSICAL_3_4_ACTIVITIES = [
  { id: 'bat-vong', name: 'Bật liên tục qua 3 vòng', emoji: '⭕', color: 'bg-pink-200', videoId: 'KW_t6YFsX0A' },
  { id: 'di-duong-hep-34', name: 'Đi trong đường hẹp', emoji: '🚶', color: 'bg-blue-200', videoId: 'TXjTR2wzeEw' },
  { id: 'di-chay-dich-dac', name: 'Đi – chạy đổi hướng trong đường dích dắc', emoji: '👣', color: 'bg-yellow-200', videoId: 'QhYDFdSjyJs' },
  { id: 'nem-xa-1-tay', name: 'Ném xa bằng 1 tay', emoji: '☄️', color: 'bg-orange-200', videoId: '1y70BDaJkwg' },
  { id: 'tung-bat-bong-34', name: 'Tung và bắt bóng cùng cô (2,5 m)', emoji: '🏐', color: 'bg-sky-200', videoId: 'G3AJ2G60XjE' },
  { id: 'di-kieng-got', name: 'Đi kiễng gót liên tục 3m', emoji: '👣', color: 'bg-red-200', videoId: 'SGyVltLihhs' },
  { id: 'lan-bong-co', name: 'Lăn bóng với cô', emoji: '⚽', color: 'bg-green-200', videoId: 'MIWVWugumpE' },
  { id: 'chuyen-bat-bong-hang-ngang', name: 'Chuyền, bắt bóng 2 bên theo hàng ngang', emoji: '🏐', color: 'bg-yellow-200', videoId: 'COr7oRnIrlI' },
  { id: 'truon-phia-truoc', name: 'Trườn về phía trước', emoji: '🦎', color: 'bg-orange-200', videoId: 'dzzT2BYjZ4g' },
  { id: 'bo-dich-dac', name: 'Bò theo đường dích dắc', emoji: '🐍', color: 'bg-purple-200', videoId: 'g4Xc-efVCto' },
  { id: 'buoc-len-xuong-buc', name: 'Bước lên, xuống bục cao', emoji: '🪜', color: 'bg-pink-200', videoId: 'lCKK3eUF4oA' },
  { id: 'nem-bong-ro', name: 'Ném bóng vào rổ', emoji: '🏀', color: 'bg-sky-200', videoId: '-q2YeXAcHgY' },
  { id: 'da-bong-phia-truoc', name: 'Đá bóng về phía trước', emoji: '⚽', color: 'bg-emerald-200', videoId: 'oRJHRm3wc5U' },
];

const PHYSICAL_4_5_ACTIVITIES = [
  { id: 'di-buoc-lui', name: 'Đi bước lùi liên tiếp khoảng 3 m', emoji: '👣', color: 'bg-blue-200', videoId: '-o8AKomCuQc' },
  { id: 'nem-trung-dich', name: 'Ném trúng đích ngang bằng 1 tay', emoji: '🎯', color: 'bg-red-200', videoId: 'cgv0YTrCDtM' },
  { id: 'bo-ban-tay-chan', name: 'Bò bằng bàn tay và bàn chân 3-4m', emoji: '🦎', color: 'bg-green-200', videoId: '91ewTiixPWk' },
  { id: 'treo-thang', name: 'Trèo lên, xuống 5 gióng thang', emoji: '🪜', color: 'bg-yellow-200', videoId: 'JA4GMbwLC_I' },
  { id: 'bat-vat-can', name: 'Bật qua vật cản cao 10 - 15cm', emoji: '🏃', color: 'bg-orange-200', videoId: 'F-siue7bCLE' },
  { id: 'di-got-khuyu-lui', name: 'Đi bằng gót chân, đi khuỵu gối, đi lùi', emoji: '👣', color: 'bg-purple-200', videoId: 'cKbxtgBo8DQ' },
  { id: 'di-vach-ke-thang', name: 'Đi trên vạch kẻ thẳng trên sàn', emoji: '📏', color: 'bg-pink-200', videoId: 'YXLKng4qhGQ' },
  { id: 'dap-bat-bong-tai-cho', name: 'Đập và bắt bóng tại chỗ', emoji: '🏀', color: 'bg-sky-200', videoId: 'ZwR9xtJB5cg' },
  { id: 'nem-xa-1-tay-45', name: 'Ném xa bằng 1 tay', emoji: '☄️', color: 'bg-emerald-200', videoId: '1y70BDaJkwg' },
  { id: 'truon-huong-thang', name: 'Trườn theo hướng thẳng', emoji: '🦎', color: 'bg-red-200', videoId: '-tpYzv8wpCI' },
  { id: 'bat-tach-khep-chan', name: 'Bật tách chân, khép chân qua 5 ô', emoji: '🏃', color: 'bg-blue-200', videoId: '6PCu4AVbFM8' },
];

const PHYSICAL_5_6_ACTIVITIES = [
  { id: 'di-mep-ngoai-khuyu-goi', name: 'Đi bằng mép ngoài bàn chân, đi khuỵu gối', emoji: '👣', color: 'bg-orange-200', videoId: 'FjdX3FTPCIM' },
  { id: 'tung-bat-bong-cao', name: 'Tung bóng lên cao và bắt bóng', emoji: '🏐', color: 'bg-yellow-200', videoId: 'Qu5b4EyQd4g' },
  { id: 'nem-trung-dich-dung', name: 'Ném trúng đích đứng', emoji: '🎯', color: 'bg-green-200', videoId: 'or4t6UzTJIo' },
  { id: 'bo-dich-dac-7-diem', name: 'Bò dích dắc qua 7 điểm', emoji: '🐍', color: 'bg-blue-200', videoId: 'REOkHUiqaRU' },
  { id: 'bat-nhay-tu-cao', name: 'Bật- nhảy từ trên cao xuống (40-45cm)', emoji: '🐰', color: 'bg-purple-200', videoId: 'VObLzuWSoVA' },
  { id: 'lan-bong-ziczac-5-chuong-ngai', name: 'Lăn bóng ziczac theo 5 chướng ngại vật', emoji: '⚽', color: 'bg-pink-200', videoId: 'hINUJ1Vr4KU' },
  { id: 'chay-18m-chuyen-bong', name: 'Chạy 18m trong khoảng 10s; Chuyền bóng qua đầu', emoji: '🏃', color: 'bg-red-200', videoId: 'gmSBPDbyu1E' },
  { id: 'di-ghe-tui-cat', name: 'Đi trên ghế thể dục đầu đội túi cát', emoji: '🪜', color: 'bg-sky-200', videoId: 'Grpwt5K5qdA' },
  { id: 'treo-thang-nhanh-kheo', name: 'Trèo lên xuống 7 gióng thang; Nhanh và khéo', emoji: '🪜', color: 'bg-emerald-200', videoId: 'CaK0t2WfbQY' },
  { id: 'bat-7-o-dua-bong-gon', name: 'Bật tách khép chân qua 7 ô; Đưa bóng vào gôn', emoji: '⚽', color: 'bg-yellow-200', videoId: 'BnzuweSeIsU' },
  { id: 'truon-treo-ghe-dai', name: 'Trườn kết hợp trèo qua ghế dài 1,5m x 30 cm', emoji: '🦎', color: 'bg-orange-200', videoId: 'SJEb7ldRk68' },
];

const SOCIAL_TODDLER_ACTIVITIES = [
  { id: 'chao-hoi-le-phep', name: 'Kỹ năng chào hỏi lễ phép', emoji: '🙏', color: 'bg-emerald-100', videoId: 'p2a38xT8tTk' },
  { id: 'cam-thia-tu-xuc', name: 'Kỹ năng cầm thìa tự xúc cơm', emoji: '🥄', color: 'bg-orange-100', videoId: 'TpeBoM5aQps' },
  { id: 'cam-coc-uong-nuoc', name: 'Kỹ năng cầm cốc uống nước đúng cách', emoji: '🥛', color: 'bg-blue-100', videoId: 'CzGjM7cnA7s' },
  { id: 'bo-rac-dung-noi', name: 'Kỹ năng bỏ rác đúng nơi quy định', emoji: '🗑️', color: 'bg-green-100', videoId: 'q5Os_YYGEgY' },
  { id: 'be-ghe', name: 'Kỹ năng bê ghế', emoji: '🪑', color: 'bg-amber-100', videoId: '6o2JKPJOUGA' }
];

const SOCIAL_4_5_ACTIVITIES = [
  { id: 'phong-tranh-lac', name: 'Kĩ năng phòng tránh khi bị lạc', emoji: '🏢', color: 'bg-pink-100', videoId: 'WU_ZOAKa47A' },
  { id: 'xu-tri-bat-coc', name: 'Xử trí khi bị bắt cóc', emoji: '⚠️', color: 'bg-red-100', videoId: '2NEBhR8LaIE' },
  { id: 'quy-tac-5-ngon', name: 'Quy tắc 5 ngón tay', emoji: '✋', color: 'bg-yellow-100', videoId: '_KIXLfEQ_uc' },
  { id: 'nhan-biet-nguoi-la', name: 'Nhận biết người lạ', emoji: '👤', color: 'bg-slate-200', videoId: '6hoGqc0_mbY' },
  { id: 'thoat-hiem-chay', name: 'Cách thoát hiểm khi có cháy', emoji: '🔥', color: 'bg-orange-100', videoId: 'k8uMv-KDG_s' },
  { id: 'xu-tri-bi-bong', name: 'Xử trí khi bị bỏng', emoji: '🔥', color: 'bg-orange-100', videoId: 'Tvd_vH1qGAc' },
  { id: 'xu-tri-cho-du', name: 'Cách xử trí khi gặp chó dữ', emoji: '🐕', color: 'bg-slate-200', videoId: 'ZBhcm4DvDfw' },
  { id: 'biet-cam-on', name: 'Biết cảm ơn khi được giúp đỡ', emoji: '🙏', color: 'bg-emerald-100', videoId: '-e8-jW2_Itg' },
  { id: 'lich-su-cong-cong', name: 'Lịch sự nơi công cộng', emoji: '🏢', color: 'bg-blue-100', videoId: 'bniXIOd6M_g' },
  { id: 'buoc-day-giay', name: 'Kỹ năng buộc dây giày', emoji: '👟', color: 'bg-amber-100', videoId: 'KmosqAcTp-o' },
  { id: 'su-dung-dua', name: 'Cách sử dụng đũa', emoji: '🥢', color: 'bg-orange-100', videoId: 'Ov1_BzS3dfA' },
  { id: 'keo-khoa-ao', name: 'Cách kéo khóa áo', emoji: '🧥', color: 'bg-sky-100', videoId: 'DLDEGiO4nJY' },
  { id: 'tha-lay-tam', name: 'Cách thả tăm và lấy tăm', emoji: '🦷', color: 'bg-slate-100', videoId: '5X_Z_SIoJKs' },
  { id: 'boc-vo-trung', name: 'Cách bóc vỏ trứng', emoji: '🥚', color: 'bg-yellow-100', videoId: 'o_WRas_tHiM' }
];

const SOCIAL_3_4_ACTIVITIES = [
  { id: 'nhan-biet-cam-xuc-34', name: 'Nhận biết cảm xúc vui, buồn, ngạc nhiên', emoji: '😊', color: 'bg-yellow-100', videoId: '51lYAbCttAE' },
  { id: 'tu-phuc-vu', name: 'Kỹ năng tự phục vụ', emoji: '👕', color: 'bg-emerald-100', videoId: '8bpeIXJhBsQ' },
  { id: 'su-binh-tinh', name: 'Câu chuyện về sự bình tĩnh', emoji: '🧘', color: 'bg-sky-100', videoId: 'tiPp5lxzXgA' },
  { id: 'an-toan-thiet-bi', name: 'An toàn với thiết bị trong nhà', emoji: '🏠', color: 'bg-red-100', videoId: 'IKyYu_Lkw3Y' },
  { id: 'phong-tranh-do-nguy-hiem', name: 'Phòng tránh đồ dùng nguy hiểm', emoji: '⚠️', color: 'bg-orange-100', videoId: '3uFWcPq3btU' },
  { id: 'an-toan-cau-thang', name: 'An toàn khi lên xuống cầu thang', emoji: '🪜', color: 'bg-blue-100', videoId: '0vfOag9UBmc' },
  { id: 'dong-mo-nap-chai', name: 'Đóng mở nắp chai, lọ', emoji: '🧴', color: 'bg-emerald-100', videoId: 'LRIpgz2QXUE' },
  { id: 'su-dung-keo-an-toan', name: 'Sử dụng kéo an toàn', emoji: '✂️', color: 'bg-amber-100', videoId: 'BjYzeM0V-WQ' },
  { id: 'cai-coi-cuc-ao', name: 'Kỹ năng cài cúc, cởi cúc', emoji: '🧥', color: 'bg-purple-100', videoId: 'grz7PHqlh4o' },
  { id: 'quet-hot-rac', name: 'Quét và hót rác trên sàn', emoji: '🧹', color: 'bg-slate-200', videoId: 'BCvF14c-NYA' }
];

const SOCIAL_5_6_ACTIVITIES = [
  { id: 'cam-xuc-cua-be', name: 'Cảm xúc của bé', emoji: '🎭', color: 'bg-blue-100', videoId: '51lYAbCttAE' },
  { id: 'noi-loi-yeu-thuong', name: 'Nói lời yêu thương', emoji: '❤️', color: 'bg-pink-100', videoId: 'tiPp5lxzXgA' },
  { id: 'vui-choi-doan-ket', name: 'Vui chơi đoàn kết', emoji: '🤝', color: 'bg-green-100', videoId: 'XbfRJXYxrXE' },
  { id: 'nu-cuoi-than-thien', name: 'Nụ cười thân thiện', emoji: '😊', color: 'bg-yellow-100', videoId: 'DTEvrDZdV2g' },
  { id: 'ban-be-chia-se', name: 'Bạn bè cùng chia sẻ', emoji: '👫', color: 'bg-purple-100', videoId: '3KL8PV8AjGE' },
  { id: 'su-dung-dien-an-toan', name: 'Kỹ năng sử dụng điện an toàn', emoji: '⚡', color: 'bg-yellow-100', videoId: '3J42V77DTj0' },
  { id: 'xu-ly-duoi-nuoc', name: 'Cách xử lý khi bị đuối nước', emoji: '🏊', color: 'bg-sky-100', videoId: 'QMO0_DBjXuE' }
];

const AESTHETIC_4_5_SECTIONS = [
  {
    title: '🎨 Tạo hình',
    items: [
      { id: 'cat-gap-con-ga', name: 'Cắt gấp dán con gà', emoji: '🐔', color: 'bg-yellow-400', videoId: '5D_rxBVDkR0' },
      { id: 've-con-trung', name: 'Vẽ côn trùng', emoji: '🐞', color: 'bg-green-400', videoId: 'oHmDn49Rj6s' },
      { id: 'gap-cay-thong', name: 'Gấp cây thông', emoji: '🌲', color: 'bg-emerald-400', videoId: 'kacYRv-48_A' },
      { id: 've-may-bay', name: 'Vẽ máy bay', emoji: '✈️', color: 'bg-sky-400', videoId: 'GKYh8l9mGzc' },
      { id: 've-cai-trong', name: 'Vẽ cái trống', emoji: '🥁', color: 'bg-orange-400', videoId: 'RyzGlm2YOv8' },
      { id: 've-cai-coc', name: 'Vẽ cái cốc', emoji: '🥛', color: 'bg-blue-400', videoId: '9d0DV44o7mc' },
      { id: 've-chiec-kem', name: 'Vẽ chiếc kem', emoji: '🍦', color: 'bg-pink-400', videoId: 'BC0FhuySbS0' },
      { id: 've-con-ca', name: 'Vẽ con cá', emoji: '🐟', color: 'bg-sky-400', videoId: 'ezIZbXrPMig' },
      { id: 'cat-dan-tia-nang', name: 'Cắt dán tia nắng', emoji: '☀️', color: 'bg-yellow-400', videoId: 'HDV-4QMKO0U' },
      { id: 'xe-dan-vay-ca', name: 'Xé dán vẩy cá (ĐT)', emoji: '🐠', color: 'bg-orange-400', videoId: 'gQoNGMhypsc' },
    ]
  },
  {
    title: '🎵 Âm nhạc',
    items: [
      { id: 'nga-tu-duong-pho', name: 'Em đi qua ngã tư đường phố', emoji: '🚦', color: 'bg-blue-400', videoId: '8_gbsyVxKT8' },
      { id: 'chau-yeu-cong-nhan', name: 'Cháu yêu cô chú công nhân', emoji: '👷', color: 'bg-amber-400', videoId: 'ARDczrBrquk' },
      { id: 'do-ban', name: 'Bài hát Đố bạn', emoji: '❓', color: 'bg-purple-400', videoId: 'sc-6sG4FWqU' },
      { id: 'con-chuon-chuon', name: 'Con chuồn chuồn', emoji: '🚁', color: 'bg-sky-300', videoId: 'X4Eom3dKjYQ' },
      { id: 'nha-cua-toi', name: 'Nhà của tôi', emoji: '🏠', color: 'bg-pink-400', videoId: 'Q8rT9-dMYK4' },
      { id: 'em-yeu-cay-xanh', name: 'Bài hát Em yêu cây xanh', emoji: '🌳', color: 'bg-green-400', videoId: 'r8OfI_vog1c' },
      { id: 'bau-va-bi', name: 'Bầu và bí', emoji: '🥒', color: 'bg-emerald-400', videoId: 'qyvooDB-wQc' },
      { id: 'mua-he-den', name: 'Mùa hè đến', emoji: '☀️', color: 'bg-yellow-400', videoId: 'ujFE2XU0Z8c' },
      { id: 'cho-toi-di-lam-mua', name: 'Cho tôi đi làm mưa với', emoji: '🌧️', color: 'bg-sky-400', videoId: 'hWign3FKCqI' },
      { id: 'banh-chung-xanh', name: 'Bánh chưng xanh', emoji: '🍱', color: 'bg-green-500', videoId: 'rIaqdhZLXug' },
      { id: 'di-xe-dap', name: 'Đi xe đạp', emoji: '🚲', color: 'bg-blue-300', videoId: 'RIEd0kVS3z8' },
    ]
  }
];

const AESTHETIC_TODDLER_SECTIONS = [
  {
    title: '🎨 Tạo hình',
    items: [
      { id: 'dan-chum-bong', name: 'Dán chùm bóng bay', emoji: '🎈', color: 'bg-red-400', videoId: 'cd--QA8MQqo' },
      { id: 'dan-hoa-tang-co', name: 'Dán hoa tặng cô', emoji: '💐', color: 'bg-pink-400', videoId: 'Jv3Y9zsJl8M' },
      { id: 'di-mau-o-rom', name: 'Di màu làm ổ rơm', emoji: '🧺', color: 'bg-orange-400', videoId: 'hLYvB_FX_Xk' },
      { id: 'nan-banh-deo', name: 'Nặn bánh dẻo chay', emoji: '🍡', color: 'bg-slate-400' },
      { id: 'nan-qua-tron', name: 'Nặn quả tròn', emoji: '🍎', color: 'bg-green-400', videoId: 'ycsQeKBfoFs' },
      { id: 've-duong-ve-nha', name: 'Vẽ đường về nhà', emoji: '🏠', color: 'bg-blue-400', videoId: 'c1Sr_LLAhYw' },
      { id: 'nan-con-giun', name: 'Nặn con giun', emoji: '🪱', color: 'bg-pink-300', videoId: 'cFf8t3acunA' },
      { id: 've-to-chim', name: 'Vẽ tổ chim', emoji: '🪹', color: 'bg-amber-300', videoId: 'RwY34N4z6SA' },
      { id: 've-cuon-len', name: 'Vẽ cuộn len màu', emoji: '🧶', color: 'bg-purple-300', videoId: '_16QJSmjbjE' },
      { id: 'nan-doi-dua', name: 'Nặn đôi đũa', emoji: '🥢', color: 'bg-slate-300', videoId: 'KC5vY1p2LNU' },
      { id: 'nan-vien-phan', name: 'Nặn viên phấn', emoji: '🖍️', color: 'bg-white', videoId: '78RBPwrSkbw' },
      { id: 'chuyen-hat-kep', name: 'Chuyển hạt bằng kẹp', emoji: '🥢', color: 'bg-emerald-300', videoId: 'RthfiEua--M' },
    ]
  },
  {
    title: '🎵 Âm nhạc',
    items: [
      { id: 'dh-lai-o-to', name: 'DH “Lái ô tô”', emoji: '🚗', color: 'bg-sky-400', videoId: 'defkunCiRgY' },
      { id: 'dh-ca-vang-boi', name: 'Dạy hát “Cá vàng bơi”', emoji: '🐠', color: 'bg-yellow-400', videoId: 'xWrWiAqCbcc' },
      { id: 'vdtn-bap-cai-xanh', name: 'VĐTN: “Bắp cải xanh”', emoji: '🥬', color: 'bg-emerald-400', videoId: 'tjUxxoqpnA4' },
      { id: 'nh-be-chuc-xuan', name: 'Nghe hát: “Bé chúc xuân”', emoji: '🧧', color: 'bg-red-400', videoId: 'VPLgQktGEK0' },
      { id: 'chau-yeu-ba', name: 'Cháu yêu bà', emoji: '👵', color: 'bg-pink-400', videoId: '2a8QDoJguyA' },
      { id: 'chau-di-mau-giao', name: 'Cháu đi mẫu giáo', emoji: '🎒', color: 'bg-sky-400', videoId: 'e848OnCYEzE' },
      { id: 'di-hoc-ve', name: 'Đi học về', emoji: '🏠', color: 'bg-amber-400', videoId: 'gphG6PKF98I' },
      { id: 'ca-nha-thuong-nhau', name: 'Cả nhà thương nhau', emoji: '👨‍👩‍👧‍👦', color: 'bg-red-400', videoId: '3gnelyE2P3E' },
      { id: 'ai-yeu-chu-meo', name: 'Ai cũng yêu chú mèo', emoji: '🐱', color: 'bg-orange-400', videoId: 'md09rw16z3o' },
    ]
  }
];

const AESTHETIC_3_4_SECTIONS = [
  {
    title: '🎨 Tạo hình',
    items: [
      { id: 've-khuon-mat-cuoi', name: 'Vẽ khuôn mặt cười (Mẫu)', emoji: '😊', color: 'bg-yellow-400', videoId: '60Gpy6DlOsE' },
      { id: 've-trai-tim-cau-vong', name: 'Vẽ và tô màu trái tim cầu vồng', emoji: '🌈❤️', color: 'bg-pink-400', videoId: 'rzEvK61LJfs' },
      { id: 've-gau-bong', name: 'Vẽ, tô màu đồ chơi bé thích: Gấu bông', emoji: '🧸', color: 'bg-amber-400', videoId: 'VysNlwmodq0' },
      { id: 'tao-hinh-cam-xuc', name: 'Tạo hình khuôn mặt cảm xúc', emoji: '🎭', color: 'bg-blue-400', videoId: 'QbbFwaD4CYo' },
      { id: 'in-ngon-tay-chim', name: 'In ngón tay tạo thành con chim', emoji: '🐦', color: 'bg-sky-300', videoId: '_aAk5n9A2hg' },
      { id: 'nan-con-cua', name: 'Nặn con cua', emoji: '🦀', color: 'bg-red-300', videoId: '_yTOyvVaOG4' },
      { id: 'lam-cot-den-gt', name: 'Làm cột đèn giao thông từ vật liệu tái chế', emoji: '🚦', color: 'bg-slate-400', videoId: 'eA7leYwSKjQ' },
      { id: 'lam-oto-tai', name: 'Làm ô tô tải từ vỏ hộp sữa', emoji: '🚛', color: 'bg-blue-300', videoId: 'Ycxy27900Aw' },
    ]
  },
  {
    title: '🎵 Âm nhạc',
    items: [
      { id: 'ga-meo-cun', name: 'Gà trống mèo con và cún con', emoji: '🐓🐱🐶', color: 'bg-amber-400', videoId: 'JvS2_meKCI' },
      { id: 'di-duong-em-nho', name: 'Đi đường em nhớ', emoji: '🚶', color: 'bg-emerald-400', videoId: '2qS1zlm_axo' },
      { id: 'sap-den-tet-roi', name: 'Bài hát Sắp đến Tết rồi', emoji: '🧧', color: 'bg-red-400', videoId: 'bWK2oRpO9EM' },
      { id: 'bai-hat-mua-xuan', name: 'Bài hát Mùa xuân', emoji: '🌸', color: 'bg-pink-400', videoId: 'zs4crUpSCAo' },
      { id: 'hoa-truong-em', name: 'Bài hát "Hoa trường em"', emoji: '🌼', color: 'bg-yellow-300', videoId: 'uKiXbFZssjk' },
    ]
  }
];

const AESTHETIC_5_6_SECTIONS = [
  {
    title: '🎨 Tạo hình',
    items: [
      { id: 've-con-bo-sua', name: 'Vẽ con bò sữa', emoji: '🐄', color: 'bg-stone-400', videoId: 'QPmGz3AhxUI' },
      { id: 'dan-nong-mot', name: 'Đan nong mốt', emoji: '🧺', color: 'bg-orange-400', videoId: 'T3gtrnA4cMI' },
      { id: 'lam-chong-chong', name: 'Làm chong chóng giấy', emoji: '🎡', color: 'bg-sky-400', videoId: '5vdU2Y0mCTw' },
      { id: 'tao-hinh-soi-da', name: 'Tạo hình từ sỏi đá', emoji: '🪨', color: 'bg-slate-400', videoId: '_QShvVYPYvM' },
      { id: 've-truong-tieu-hoc', name: 'Vẽ trường tiểu học', emoji: '🏫', color: 'bg-red-400', videoId: 'N3_tc3_jfB0' },
      { id: 'tao-hinh-ban-tay', name: 'In tạo hình con vật từ bàn tay', emoji: '✋🐾', color: 'bg-pink-400', videoId: 'sQIIv7JD0Xk' },
      { id: 've-chan-dung-co', name: 'Vẽ chân dung cô giáo', emoji: '👩‍🏫', color: 'bg-purple-400', videoId: 'FPrms0WrMBc' },
      { id: 'xe-dan-dan-ca', name: 'Xé dán đàn cá', emoji: '🐟', color: 'bg-blue-400', videoId: 'bNxIHVnv5TE' },
      { id: 'tranh-quat-giay', name: 'Sáng tạo tranh từ quạt giấy', emoji: '🪭', color: 'bg-pink-300', videoId: 't-m84fRXNSo' },
      { id: 'in-tranh-dong-ho', name: 'In tranh Đông Hồ', emoji: '🖼️', color: 'bg-amber-400', videoId: '8j6_2vMu2OM' },
      { id: 've-truong-mn', name: 'Vẽ trường mầm non của bé', emoji: '🏫', color: 'bg-emerald-400', videoId: 'bNcSeaVmRFo' },
      { id: 'lam-quat-giay', name: 'Dạy trẻ làm quạt giấy', emoji: '🪭', color: 'bg-orange-300', videoId: 'lRMp2BRFA44' },
      { id: 'gap-thuyen-origami', name: 'Gấp thuyền giấy phong cách origami', emoji: '⛵', color: 'bg-blue-300', videoId: '3Ckx4p2z1As' },
    ]
  },
  {
    title: '🎵 Âm nhạc',
    items: [
      { id: 'khuc-hat-doi-ban-tay', name: 'Bài hát Khúc hát đôi bàn tay', emoji: '🙌', color: 'bg-emerald-400', videoId: 'IujwnYaVAZ0' },
      { id: 'nha-minh-rat-vui', name: 'VĐMH: “Nhà mình rất vui”', emoji: '🏠👨‍👩‍👧‍👦', color: 'bg-yellow-400', videoId: 'MpM109hnrtE' },
      { id: 'am-tra', name: 'Tôi là cái ấm trà', emoji: '🫖', color: 'bg-sky-300', videoId: 'rJxUYLP24DE' },
      { id: 'chu-bo-doi', name: 'Chú bộ đội', emoji: '💂', color: 'bg-green-600', videoId: 'pEfC88oti0k' },
      { id: 'bac-dua-thu', name: 'Bác đưa thư vui tính', emoji: '📮', color: 'bg-amber-300', videoId: 't-b5BTilg44' },
      { id: 'lai-may-cay', name: 'Lớn lên cháu lái máy cày', emoji: '🚜', color: 'bg-orange-400', videoId: 'l9Pq-LS3KFw' },
      { id: 'voi-con-ban-don', name: 'Chú voi con ở bản đôn', emoji: '🐘', color: 'bg-stone-400', videoId: 'ZEFjgndKTmA' },
      { id: 'phi-cong', name: 'Anh phi công ơi', emoji: '👨‍✈️', color: 'bg-blue-400', videoId: 'WPrsXLwRPvA' },
      { id: 'ong-nau-em-be', name: 'Chị Ong Nâu và Em bé', emoji: '🐝', color: 'bg-yellow-400', videoId: '1TA4FF6XKGQ' },
    ]
  }
];

const COGNITIVE_SECTIONS = [
  {
    title: '1️⃣ Làm quen toán',
    items: [
      { id: 'numbers', name: 'Nhận biết số 1–10', emoji: '1️⃣', color: 'bg-[#FF6B9E]' },
      { id: 'compare-qty', name: 'So sánh nhiều – ít', emoji: '⚖️', color: 'bg-[#34A4E4]' },
      { id: 'shapes', name: 'Hình tròn, vuông, tam giác', emoji: '🔺', color: 'bg-[#8DE065]' },
      { id: 'patterns', name: 'Sắp xếp theo quy tắc', emoji: '🧩', color: 'bg-[#FFD13B]' },
    ]
  },
  {
    title: '2️⃣ Khám phá khoa học',
    items: [
      { id: 'animals', name: 'Con vật sống ở đâu?', emoji: '🐾', color: 'bg-[#FF6B9E]' },
      { id: 'plants', name: 'Cây cần gì để lớn?', emoji: '🌱', color: 'bg-[#34A4E4]' },
      { id: 'day-night', name: 'Hiện tượng ngày – đêm', emoji: '🌞', color: 'bg-[#8DE065]' },
      { id: 'weather', name: 'Thời tiết', emoji: '⛅', color: 'bg-[#FFD13B]' },
    ]
  },
  {
    title: '3️⃣ Phân loại – so sánh',
    items: [
      { id: 'size', name: 'To – nhỏ', emoji: '🐘', color: 'bg-[#FF6B9E]' },
      { id: 'height', name: 'Cao – thấp', emoji: '🦒', color: 'bg-[#34A4E4]' },
      { id: 'length', name: 'Dài – ngắn', emoji: '📏', color: 'bg-[#8DE065]' },
      { id: 'colors', name: 'Màu sắc', emoji: '🎨', color: 'bg-[#FFD13B]' },
    ]
  }
];

const LEARNING_SECTIONS = [
  { id: 'lessons', title: 'Bài học', description: 'Ngắn – trực quan', icon: '📺', color: 'bg-[#CDEBFF]' },
  { id: 'games', title: 'Trò chơi tương tác', description: 'Học mà chơi', icon: '🎮', color: 'bg-[#C8F7DC]' },
  { id: 'records', title: 'Ghi nhận kết quả', description: 'Lưu lại khoảnh khắc', icon: '📸', color: 'bg-[#FFD6E8]' },
  { id: 'reports', title: 'Báo cáo tiến bộ', description: 'Theo dõi sự phát triển', icon: '📈', color: 'bg-[#E5D9FF]' },
];

const PRAISE_PHRASES = [
  "Chúc mừng bé đã làm đúng!",
  "Giỏi lắm!",
  "Tuyệt vời quá!",
  "Bé thật thông minh!"
];

const ENCOURAGE_PHRASES = [
  "Con hãy thử lại nhé!",
  "Gần đúng rồi, cố lên nào!",
  "Không sao, mình làm lại nhé!"
];

// Audio Context for playing PCM data from Gemini
let audioCtx: AudioContext | null = null;

const playBase64PCM = async (base64Data: string): Promise<void> => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume();
  }
  
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const buffer = new Int16Array(bytes.buffer);
  const audioBuffer = audioCtx.createBuffer(1, buffer.length, 24000);
  const channelData = audioBuffer.getChannelData(0);
  for (let i = 0; i < buffer.length; i++) {
    channelData[i] = buffer[i] / 32768.0;
  }
  
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  
  return new Promise<void>((resolve) => {
    source.onended = () => resolve();
    source.start();
  });
};

const speak = async (text: string, isPraise = false, lang = 'vi'): Promise<void> => {
  if (process.env.GEMINI_API_KEY) {
    try {
      let promptText = '';
      let voiceName = 'Kore'; // Kore is a good female-sounding voice
      
      if (lang === 'en') {
        promptText = isPraise
          ? `Read in English, cheerful female voice, praising a child: ${text}`
          : `Read in English, gentle female voice, slow and clear for a child: ${text}`;
        voiceName = 'Puck'; // Puck is a clear voice for English
      } else {
        promptText = isPraise 
          ? `Đọc bằng tiếng Việt, giọng nữ ngọt ngào, đáng yêu, vui vẻ, khen ngợi bé: ${text}`
          : `Đọc bằng tiếng Việt, giọng nữ ngọt ngào, đáng yêu, nhẹ nhàng, truyền cảm, chậm rãi, rõ ràng cho trẻ mầm non: ${text}`;
      }
        
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: promptText }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
          },
        },
      });
      
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return await playBase64PCM(base64Audio);
      }
    } catch (e) {
      console.error("Gemini TTS failed, falling back to browser TTS", e);
    }
  }
  
  if ('speechSynthesis' in window) {
    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'vi-VN';
      
      // Try to find a female Vietnamese voice
      const voices = window.speechSynthesis.getVoices();
      if (lang === 'vi' || !lang) {
        const viFemaleVoice = voices.find(v => 
          v.lang.includes('vi') && 
          (v.name.toLowerCase().includes('female') || 
           v.name.toLowerCase().includes('nữ') || 
           v.name.toLowerCase().includes('hoai-my') || 
           v.name.toLowerCase().includes('linh'))
        );
        if (viFemaleVoice) utterance.voice = viFemaleVoice;
      } else if (lang === 'en') {
        const enFemaleVoice = voices.find(v => 
          v.lang.includes('en') && 
          (v.name.toLowerCase().includes('female') || 
           v.name.toLowerCase().includes('zira') || 
           v.name.toLowerCase().includes('samantha') ||
           v.name.toLowerCase().includes('victoria'))
        );
        if (enFemaleVoice) utterance.voice = enFemaleVoice;
      }

      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [letterLang, setLetterLang] = useState<'vi' | 'en'>('vi');
  const [stars, setStars] = useState(0);
  const [activeMathGame, setActiveMathGame] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{url: string, name: string, type: 'image' | 'video'}[]>([]);
  const [emotionHistory, setEmotionHistory] = useState<{emotion: string, date: string, feedback: string}[]>([]);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(30 * 60); // 30 minutes
  const [sessionTimeLimit, setSessionTimeLimit] = useState(30); // in minutes
  const [showSessionEndModal, setShowSessionEndModal] = useState(false);
  const [showEyeExercise, setShowEyeExercise] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userEmotion, setUserEmotion] = useState<string | null>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<string | null>(null);
  const [stickers, setStickers] = useState<string[]>([]);
  const [showBreathing, setShowBreathing] = useState(false);

  useEffect(() => {
    // Splash screen is now hidden by user interaction to ensure AudioContext is resumed
    setIsTimerRunning(true);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && sessionTimeLeft > 0) {
      interval = setInterval(() => {
        setSessionTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (sessionTimeLeft === 0) {
      setIsTimerRunning(false);
      setShowEyeExercise(true);
      speak("Bạn ơi, mắt tớ mỏi rồi, chúng mình cùng đi uống nước và nhìn ra xa một lát nhé!", true);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, sessionTimeLeft]);

  const handleCategoryClick = (id: string) => {
    setCurrentView(id);
    setSelectedAge(null);
    speak(CATEGORIES.find(c => c.id === id)?.title || '');
  };

  const getItemSpeechText = (item: any) => {
    let textToSpeak = item.name;
    let lang = 'vi';
    
    if (currentView === 'language') {
      if (item.id && (item.id.toString().startsWith('story-') || item.id.toString().startsWith('poem-'))) {
        textToSpeak = item.name;
        lang = 'vi';
      } else if (letterLang === 'vi') {
        // For Vietnamese, read the letter and the descriptive sentence
        const description = item.name.split(' – ')[1] || item.name;
        textToSpeak = `Chữ ${item.id}. ${description}`;
        lang = 'vi';
      } else {
        // For English, we provide a Vietnamese explanation but read the English word clearly.
        textToSpeak = `Chữ ${item.id} tiếng Anh. Đọc là: ${item.word}. Nghĩa là: ${item.name.split(', ')[1] || item.name}`;
        lang = 'vi';
      }
    }
    return { text: textToSpeak, lang };
  };

  const handleItemClick = async (item: any) => {
    setSelectedItem(item);
    setPronunciationFeedback(null);
    setIsGeneratingAudio(true);
    const { text, lang } = getItemSpeechText(item);
    await speak(text, false, lang);
    setIsGeneratingAudio(false);
  };

  const handlePronunciationPractice = async () => {
    if (!selectedItem) return;
    setIsPracticing(true);
    setPronunciationFeedback("Bé hãy đọc to lên nhé! 🎤");
    speak("Bé hãy đọc to lên nhé!");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        const base64Audio = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(audioBlob);
        });

        const targetWord = currentView === 'language' ? (letterLang === 'vi' ? selectedItem.word : selectedItem.word) : selectedItem.name;
        
        const result = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: {
            parts: [
              { inlineData: { mimeType: 'audio/webm', data: base64Audio } },
              { text: `Bé đang tập đọc từ: "${targetWord}". Hãy nhận xét xem bé đọc có đúng không. Nếu đúng hãy khen ngợi và tặng hoa 🌸. Nếu chưa rõ hãy khuyến khích bé đọc lại chậm hơn. Trả lời cực ngắn gọn.` }
            ]
          },
          config: {
            systemInstruction: "Bạn là giáo viên mầm non. Hãy nhận xét giọng đọc của bé một cách khích lệ. Chỉ trả lời 1 câu ngắn gọn."
          }
        });

        const feedback = result.text || "Bé đọc giỏi lắm!";
        setPronunciationFeedback(feedback);
        speak(feedback);
        setIsPracticing(false);
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000); // Record for 3 seconds
    } catch (error) {
      console.error("Mic error:", error);
      setIsPracticing(false);
      setPronunciationFeedback("Ôi, micro có chút vấn đề rồi bé ơi!");
    }
  };

  const handleEmotionSelect = (emotion: string) => {
    setUserEmotion(emotion);
    setShowCheckIn(false);
    
    let feedback = "";
    if (emotion === 'vui') {
      feedback = "Ôi, nhìn gương mặt rạng rỡ của con kìa! Cô cũng thấy vui lây luôn đó. Hôm nay chúng mình sẽ cùng nhau khám phá những điều thú vị nhé!";
      setStickers(prev => [...prev, '😊 Chiến binh tích cực']);
    } else if (emotion === 'buon') {
      feedback = "Bé đừng buồn nhé! Trợ lý AI sẽ gợi ý cho bé những bài hát thật vui và trò chơi nhẹ nhàng để bé thấy khá hơn nha.";
    } else if (emotion === 'tuc-gian') {
      feedback = "Cô thấy con đang hơi khó chịu một chút đúng không nào? Không sao đâu, ai cũng có lúc thấy giận dữ mà. Con cứ hít thở sâu cùng cô một lát nhé!";
    }
    
    setEmotionHistory(prev => [{
      emotion,
      date: new Date().toISOString(),
      feedback
    }, ...prev].slice(0, 20)); // Keep last 20 records

    speak(feedback, true);
  };

  useEffect(() => {
    if (['social', 'aesthetic'].includes(currentView)) {
      speak('Phần này đang được xây dựng! Bé hãy quay lại sau nhé.');
    }
  }, [currentView]);

  const closeItem = () => {
    setSelectedItem(null);
  };

  const playRandomPraise = () => {
    const phrase = PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)];
    speak(phrase, true);
  };

  const playRandomEncourage = () => {
    const phrase = ENCOURAGE_PHRASES[Math.floor(Math.random() * ENCOURAGE_PHRASES.length)];
    speak(phrase, true);
  };

  const renderHome = () => (
    <div className="flex flex-col items-center w-full pb-40 relative">
      {/* Magical Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Sun */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
          className="absolute -top-10 -right-10 text-[150px] opacity-80"
        >
          🌞
        </motion.div>
        
        {/* Clouds */}
        <motion.div 
          animate={{ x: [0, 100, 0] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-6xl opacity-70"
        >
          ☁️
        </motion.div>
        <motion.div 
          animate={{ x: [0, -80, 0] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          className="absolute top-40 right-20 text-7xl opacity-60"
        >
          ☁️
        </motion.div>
        <motion.div 
          animate={{ x: [0, 120, 0] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
          className="absolute top-80 left-1/4 text-5xl opacity-50"
        >
          ☁️
        </motion.div>

        {/* Hot Air Balloon */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-32 left-1/3 text-6xl opacity-90"
        >
          🎈
        </motion.div>

        {/* Rainbow */}
        <div className="absolute top-10 left-10 text-6xl opacity-80 transform -rotate-12">
          🌈
        </div>
      </div>

      {/* Header */}
      <div className="w-full pt-16 pb-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center sm:text-left">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl sm:text-6xl font-black text-sky-800 drop-shadow-sm mb-4"
            >
              Chào mừng các bé đến với Mầm non vui học! ✨
            </motion.h1>
            <p className="text-2xl sm:text-3xl text-sky-700/90 font-bold mb-2">Khám phá mỗi ngày – Lớn khôn từng bước</p>
            <p className="text-xl sm:text-2xl text-sky-600 font-bold mb-8 italic">Hôm nay bé muốn học gì?</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCheckIn(true)}
                className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border-2 border-pink-200 flex items-center gap-3 text-pink-600 font-black text-lg"
              >
                <span>{userEmotion ? 'Cảm xúc hiện tại: ' + (userEmotion === 'vui' ? '😊' : userEmotion === 'buon' ? '😢' : '😠') : 'Bé cảm thấy thế nào?'}</span>
                <Sparkles size={20} />
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/70 backdrop-blur-md rounded-[28px] p-4 max-w-md mx-auto sm:mx-0 shadow-sm border-2 border-white/80">
              <div className="flex justify-between text-base sm:text-lg font-bold text-sky-800 px-2 mb-3">
                <span>Hoạt động hôm nay</span>
                <span className="bg-sky-100 px-3 py-1 rounded-full text-sky-700">3/5</span>
              </div>
              <div className="h-5 bg-sky-50 rounded-full overflow-hidden border border-sky-100 p-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1.5, type: "spring" }}
                  className="h-full bg-gradient-to-r from-[#C8F7DC] to-[#8DE065] rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer"></div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Mascot */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="text-[10rem] drop-shadow-2xl relative">
              🐰🎒
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 -right-4 text-4xl"
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Emotion Suggestions */}
      {userEmotion === 'vui' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-7xl mx-auto px-6 mb-12 relative z-10"
        >
          <div className="bg-gradient-to-r from-yellow-400/20 to-emerald-400/20 backdrop-blur-md rounded-[3rem] p-8 border-4 border-white shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">🌟</span>
              <h2 className="text-3xl font-black text-sky-800">Duy trì năng lượng tích cực</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentView('aesthetic');
                  setSelectedAge('4-5');
                  speak("Con có muốn vẽ một bức tranh về điều làm con vui hôm nay không?");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-colors border-2 border-white text-center"
              >
                <span className="text-5xl">🎨</span>
                <div>
                  <p className="font-black text-sky-800 text-lg">Thẩm mỹ</p>
                  <p className="font-bold text-sky-600 text-sm">Vẽ niềm vui của bé</p>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentView('aesthetic');
                  setSelectedAge('toddler');
                  speak("Chúng mình cùng nhảy theo một bài hát thật sôi động nhé!");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-colors border-2 border-white text-center"
              >
                <span className="text-5xl">🎵</span>
                <div>
                  <p className="font-black text-sky-800 text-lg">Âm nhạc</p>
                  <p className="font-bold text-sky-600 text-sm">Nhảy múa sôi động</p>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  speak("Con hãy dành một nụ cười thật tươi cho bố mẹ ngay bây giờ nhé!");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-colors border-2 border-white text-center"
              >
                <span className="text-5xl">😊</span>
                <div>
                  <p className="font-black text-sky-800 text-lg">Kỹ năng xã hội</p>
                  <p className="font-bold text-sky-600 text-sm">Tặng nụ cười cho bố mẹ</p>
                </div>
              </motion.button>
              <div className="bg-yellow-400/30 p-6 rounded-[2rem] flex flex-col items-center gap-4 border-2 border-yellow-400/50 text-center relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 text-4xl opacity-20"
                >
                  ✨
                </motion.div>
                <span className="text-5xl">🏅</span>
                <div>
                  <p className="font-black text-yellow-900 text-lg">Phần thưởng</p>
                  <p className="font-bold text-yellow-700 text-sm">Chiến binh tích cực</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {userEmotion === 'tuc-gian' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-7xl mx-auto px-6 mb-12 relative z-10"
        >
          <div className="bg-gradient-to-r from-red-400/20 to-orange-400/20 backdrop-blur-md rounded-[3rem] p-8 border-4 border-white shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">🌬️</span>
              <h2 className="text-3xl font-black text-red-800">Cùng cô "hạ hỏa" nhé</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setShowBreathing(true);
                  speak("Hướng dẫn bé hít vào thật sâu và thở ra như đang thổi một quả bóng to để điều hòa nhịp thở.");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-colors border-2 border-white text-center"
              >
                <span className="text-5xl">🎈</span>
                <div>
                  <p className="font-black text-red-800 text-lg">Thổi bong bóng</p>
                  <p className="font-bold text-red-600 text-sm">Hít thở sâu</p>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentView('physical');
                  setSelectedAge('toddler');
                  speak("Con có muốn cùng cô nhảy một điệu nhảy lắc lư để xua tan cơn giận không?");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-colors border-2 border-white text-center"
              >
                <span className="text-5xl">💃</span>
                <div>
                  <p className="font-black text-red-800 text-lg">Vận động</p>
                  <p className="font-bold text-red-600 text-sm">Nhảy lắc lư</p>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentTab('assistant');
                  speak("Con có muốn kể cho cô nghe vì sao con giận không? Cô luôn lắng nghe con đây.");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-colors border-2 border-white text-center"
              >
                <span className="text-5xl">👂</span>
                <div>
                  <p className="font-black text-red-800 text-lg">Lắng nghe</p>
                  <p className="font-bold text-red-600 text-sm">Chia sẻ cùng AI</p>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentView('social');
                  setSelectedAge('3-4');
                  speak("Gợi ý các bài học về Kỹ năng tự phục vụ hoặc Câu chuyện về sự bình tĩnh.");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex flex-col items-center gap-4 transition-colors border-2 border-white text-center"
              >
                <span className="text-5xl">📚</span>
                <div>
                  <p className="font-black text-red-800 text-lg">Bài học</p>
                  <p className="font-bold text-red-600 text-sm">Học cách bình tĩnh</p>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {userEmotion === 'buon' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-7xl mx-auto px-6 mb-12 relative z-10"
        >
          <div className="bg-gradient-to-r from-sky-400/20 to-purple-400/20 backdrop-blur-md rounded-[3rem] p-8 border-4 border-white shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">✨</span>
              <h2 className="text-3xl font-black text-sky-800">Gợi ý để bé vui hơn</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentView('aesthetic');
                  setSelectedAge('4-5');
                  speak("Chúng mình cùng nghe bài hát Đố bạn thật vui nhé!");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex items-center gap-4 transition-colors border-2 border-white"
              >
                <span className="text-5xl">🎵</span>
                <div className="text-left">
                  <p className="font-black text-sky-800 text-lg">Bài hát vui nhộn</p>
                  <p className="font-bold text-sky-600 text-sm">Nghe nhạc cho vui</p>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentView('cognitive');
                  setSelectedAge('toddler');
                  speak("Chúng mình cùng chơi trò chơi nhận biết màu sắc nhẹ nhàng nhé!");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex items-center gap-4 transition-colors border-2 border-white"
              >
                <span className="text-5xl">🎨</span>
                <div className="text-left">
                  <p className="font-black text-sky-800 text-lg">Trò chơi nhẹ nhàng</p>
                  <p className="font-bold text-sky-600 text-sm">Khám phá màu sắc</p>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentTab('assistant');
                  speak("Bé hãy tâm sự cùng trợ lý AI nhé!");
                }}
                className="bg-white/60 hover:bg-white/80 p-6 rounded-[2rem] flex items-center gap-4 transition-colors border-2 border-white"
              >
                <span className="text-5xl">🤖</span>
                <div className="text-left">
                  <p className="font-black text-sky-800 text-lg">Tâm sự cùng AI</p>
                  <p className="font-bold text-sky-600 text-sm">Chia sẻ nỗi buồn</p>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Categories Grid */}
      <div className="flex flex-wrap justify-center gap-8 p-4 sm:p-6 max-w-7xl mx-auto w-full z-10">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(cat.id)}
            className={`${cat.color} ${cat.shadow} rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 shadow-xl border-4 border-white/80 relative overflow-hidden group min-h-[280px] w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]`}
          >
            {/* Card Decorations */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/30 rounded-full blur-2xl group-hover:bg-white/40 transition-colors"></div>
            <div className="absolute top-4 left-4 text-2xl opacity-50">🌸</div>
            <div className="absolute bottom-4 right-4 text-2xl opacity-50">🌿</div>
            
            <span className="text-8xl sm:text-9xl drop-shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
            <h2 className={`text-3xl sm:text-4xl font-black ${cat.textColor} drop-shadow-sm tracking-wide text-center leading-tight`}>{cat.title}</h2>
            <p className={`${cat.textColor} opacity-90 font-bold text-xl text-center mt-2 px-6 bg-white/40 rounded-full py-2 backdrop-blur-sm`}>{cat.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 w-full z-40 pb-6 pt-10 px-4 pointer-events-none">
      {/* Stars Display */}
      <div className="absolute top-[-80px] right-6 pointer-events-auto">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border-2 border-yellow-200 flex items-center gap-3"
        >
          <Star size={28} className="text-yellow-500 fill-yellow-500" />
          <span className="text-2xl font-black text-yellow-700">{stars}</span>
        </motion.div>
      </div>

      {/* Grass background for nav */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-[#C8F7DC] rounded-t-[50%] scale-x-110 origin-bottom pointer-events-auto shadow-[0_-10px_30px_rgba(141,224,101,0.2)]"></div>
      
      <div className="max-w-md mx-auto flex justify-between items-end relative z-10 pointer-events-auto px-6">
        {[
          { id: 'home', icon: '🏠', label: 'Trang chủ', color: 'bg-[#CDEBFF]' },
          { id: 'assistant', icon: '🤖', label: 'Trợ lý AI', color: 'bg-[#FFDAC1]' },
          { id: 'achievements', icon: '🏆', label: 'Thành tích', color: 'bg-[#FFF4B8]' },
          { id: 'parents', icon: '👨‍👩‍👧', label: 'Phụ huynh', color: 'bg-[#FFD6E8]' },
          { id: 'settings', icon: '⚙️', label: 'Cài đặt', color: 'bg-[#E5D9FF]' }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setCurrentTab(tab.id as any);
              speak(tab.label);
              if (tab.id === 'home') setCurrentView('home');
            }}
            className={`flex flex-col items-center gap-2 p-3 rounded-[24px] transition-all ${currentTab === tab.id ? `${tab.color} shadow-lg border-2 border-white scale-110 -translate-y-4` : 'bg-white/80 backdrop-blur-sm shadow-sm border-2 border-transparent hover:bg-white'}`}
          >
            <span className="text-3xl sm:text-4xl drop-shadow-sm">{tab.icon}</span>
            <span className={`text-[11px] sm:text-xs font-bold ${currentTab === tab.id ? 'text-slate-800' : 'text-slate-500'}`}>{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderAgeSelection = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return (
      <div className="flex flex-col items-center w-full pt-12 pb-40 relative z-10">
        <div className="flex items-center mb-12 gap-4 sticky top-4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-[28px] shadow-sm border-2 border-white w-full max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentView('home');
              speak("Quay lại trang chủ");
            }}
            className="p-3 bg-sky-50 rounded-full shadow-sm text-sky-600 border border-sky-100 hover:bg-sky-100 transition-colors"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </motion.button>
          <h2 className={`text-3xl sm:text-4xl font-black ${category?.textColor} capitalize`}>
            {category?.title}
          </h2>
        </div>
        
        <motion.h3 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl font-black text-sky-800 mb-10 text-center px-4 drop-shadow-sm"
        >
          Bé hãy chọn độ tuổi nhé! ✨
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 max-w-4xl mx-auto w-full">
          {AGE_GROUPS.map((age) => (
            <motion.button
              key={age.id}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedAge(age.id);
                speak(`Độ tuổi ${age.name}`);
              }}
              className={`${age.color} rounded-[32px] p-10 flex flex-col items-center justify-center gap-6 shadow-xl border-4 border-white/80 relative overflow-hidden group`}
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/30 rounded-full blur-2xl group-hover:bg-white/40 transition-colors"></div>
              <div className="absolute top-4 left-4 text-2xl opacity-50">⭐</div>
              
              <span className="text-8xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{age.icon}</span>
              <h2 className="text-4xl font-black text-slate-800/80 drop-shadow-sm tracking-wide bg-white/40 px-6 py-2 rounded-full backdrop-blur-sm">{age.name}</h2>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  const getCognitiveSections = () => {
    const sections = JSON.parse(JSON.stringify(COGNITIVE_SECTIONS));
    const mathSection = sections.find((s: any) => s.title.includes('Làm quen toán'));
    
    const scienceSection = sections.find((s: any) => s.title.includes('Khám phá khoa học'));
    const classificationSection = sections.find((s: any) => s.title.includes('Phân loại – so sánh'));

    if (selectedAge === 'toddler') {
      return [
        {
          title: 'Nhận biết - phân biệt',
          items: [
            { id: 'toddler-big-small', name: 'Nhận biết to - nhỏ', emoji: '🐘', color: 'bg-[#FF6B9E]', videoId: 'D4yEo4oxy-g' },
            { id: 'toddler-shapes', name: 'Nhận biết hình tròn – hình vuông', emoji: '⭕', color: 'bg-[#34A4E4]', videoId: 'Ac8YpNVTinQ' },
            { id: 'toddler-one-many', name: 'Nhận biết một và nhiều', emoji: '🔢', color: 'bg-[#8DE065]', videoId: 'hNLpZqwWoxo' },
            { id: 'toddler-animals', name: 'Nhận biết con gà – con vịt', emoji: '🐥', color: 'bg-[#FFD13B]', videoId: 'X5ZEUj54huE' },
            { id: 'toddler-vehicles', name: 'Nhận biết xe đạp – xe máy', emoji: '🚲', color: 'bg-[#FF6B9E]', videoId: 'TQk4xmV7LfI' },
            { id: 'toddler-weather', name: 'Nhận biết Trời nắng - trời mưa', emoji: '🌦️', color: 'bg-[#34A4E4]', videoId: '-xvFUGZqGgg' },
            { id: 'toddler-clothes', name: 'Nhận biết Quần đùi – áo cộc', emoji: '👕', color: 'bg-[#8DE065]', videoId: 'Z7R1-z2mRXs' },
            { id: 'toddler-pets', name: 'Nhận biết con chó, con mèo', emoji: '🐶', color: 'bg-[#FFD13B]', videoId: 'QSeyMIW_N18' },
            { id: 'toddler-up-down', name: 'Nhận biết phía trên - phía dưới', emoji: '↕️', color: 'bg-[#FF6B9E]', videoId: 'voWbLDte3gg' },
            { id: 'toddler-front-back', name: 'Nhận biết phía trước - phía sau', emoji: '↔️', color: 'bg-[#34A4E4]', videoId: 'khxa02LgyIA' },
          ]
        }
      ];
    } else if (selectedAge === '3-4') {
      if (mathSection) {
        mathSection.items = [
          { id: 'numbers-1-5', name: 'Bé tập đếm từ 1 đến 5', emoji: '🌟', color: 'bg-[#FF6B9E]', value: 5, videoId: 'WntRcFcsFmM' },
          { id: 'compare-qty-1-5', name: 'So sánh nhiều – ít (PV 5)', emoji: '⚖️', color: 'bg-[#34A4E4]', videoId: 'R4MzsCdp30s' },
          { id: 'shapes-basic', name: 'Hình học cơ bản', emoji: '🔺', color: 'bg-[#8DE065]', videoId: 'JUWkZ3jozwc' },
          { id: 'math-front-back', name: 'Nhận biết phía trước phía sau của bản thân', emoji: '↔️', color: 'bg-[#FFD13B]', videoId: 'hOCtSqse3o8' },
          { id: 'math-left-right', name: 'Xác định phía phải phía trái của bản thân', emoji: '⬅️', color: 'bg-[#FF6B9E]', videoId: 't5Sw1WaXL3c' },
          { id: 'math-count-3', name: 'Dạy trẻ đếm đối tượng trong phạm vi 3', emoji: '🔢', color: 'bg-[#34A4E4]', videoId: '9K6WhdyvWDI' },
          { id: 'math-circle-triangle', name: 'Nhận biết hình tròn, hình Tam giác', emoji: '⭕', color: 'bg-[#8DE065]', videoId: 'rmZ2LtVyIL0' },
          { id: 'math-one-to-one', name: 'Xếp tương ứng 1-1', emoji: '🧩', color: 'bg-[#FFD13B]', videoId: 'a-hHlCgS2a0' },
          { id: 'math-split-group', name: 'Tách một nhóm đối tượng', emoji: '✂️', color: 'bg-[#FF6B9E]', videoId: 'FN5GSt_9Oxk' },
          { id: 'math-review-compare-5', name: 'Ôn so sánh số lượng (PV 5)', emoji: '⚖️', color: 'bg-[#34A4E4]', videoId: 'CRqOHQAsVxE' },
          { id: 'math-copy-pattern', name: 'Sao chép quy tắc sắp xếp', emoji: '🧩', color: 'bg-[#8DE065]', videoId: 'bcpStf8SpMM' },
          { id: 'math-compare-length', name: 'So sánh dài hơn - ngắn hơn', emoji: '📏', color: 'bg-[#FFD13B]', videoId: 'ZtId0nZd-fs' },
        ];
      }
      if (scienceSection) {
        scienceSection.items = [
          { id: 'farm-animals', name: 'Vật nuôi gia đình', emoji: '🐶', color: 'bg-[#FF6B9E]', videoId: 'PFn6EEezM9M' },
          { id: 'plant-parts', name: 'Các bộ phận của cây', emoji: '🌳', color: 'bg-[#34A4E4]', videoId: 'gzFWrkNv-jg' },
          { id: 'sun-moon', name: 'Mặt trời & Mặt trăng', emoji: '🌞', color: 'bg-[#8DE065]' },
          { id: 'qua-thanh-long', name: 'Tìm hiểu về quả thanh long', emoji: '🌵', color: 'bg-[#FF6B9E]', videoId: 'oXEU419LERE' },
          { id: 'bo-phan-co-the', name: 'Khám phá các bộ phận trên cơ thể bé', emoji: '👦', color: 'bg-[#34A4E4]', videoId: 'UE80w3pMg_c' },
          { id: 'giay-an', name: 'Khám phá giấy ăn', emoji: '🧻', color: 'bg-[#8DE065]', videoId: 'j0xrN3w2j1U' },
          { id: 'cai-mui', name: 'Tìm hiểu về cái mũi', emoji: '👃', color: 'bg-[#FFD13B]', videoId: 's8xulOz4NXU' },
          { id: 'hoa-hong', name: 'Khám phá hoa hồng', emoji: '🌹', color: 'bg-[#FF6B9E]', videoId: 'Y5HYyO0hK_w' },
          { id: 'cac-loai-rau', name: 'Khám phá một số loại rau', emoji: '🥬', color: 'bg-[#34A4E4]', videoId: 'Mic3cGQnmeo' },
          { id: 'cac-loai-qua', name: 'Khám phá một số loại quả', emoji: '🍎', color: 'bg-[#8DE065]', videoId: 'HxTSLmawGY4' },
          { id: 'crocodile-life-cycle', name: 'Vòng đời của cá sấu', emoji: '🐊', color: 'bg-[#FFD13B]', videoId: 'vUsEusb-l2Q' },
          { id: 'insects-discovery', name: 'Tìm hiểu về côn trùng', emoji: '🐞', color: 'bg-[#FF6B9E]', videoId: 'x3m28dNgkpc' },
          { id: 'carrot-discovery', name: 'Tìm hiểu về củ cà rốt', emoji: '🥕', color: 'bg-[#34A4E4]', videoId: 'CXicJuKFZOM' },
          { id: 'egg-sink-float', name: 'Trứng chìm, trứng nổi', emoji: '🥚', color: 'bg-[#8DE065]', videoId: '9UOcvKnfQbM' },
          { id: 'color-magic', name: 'Sự kỳ diệu của màu sắc', emoji: '🎨', color: 'bg-[#FFD13B]', videoId: '8rk3MRkAlsM' },
          { id: 'day-night-discovery', name: 'Tìm hiểu ngày và đêm', emoji: '🌞🌛', color: 'bg-[#FF6B9E]', videoId: 'rDZXERvCjec' },
          { id: 'why-rain', name: 'Vì sao có mưa', emoji: '🌧️', color: 'bg-[#34A4E4]', videoId: 'ri17hd2ihb4' },
          { id: 'electric-appliances', name: 'Đồ dùng sử dụng điện', emoji: '🔌', color: 'bg-[#8DE065]', videoId: 'HSB6pvdw6Vw' },
        ];
      }
      if (classificationSection) {
        classificationSection.items = [
          { id: 'big-small', name: 'To – nhỏ', emoji: '🐘', color: 'bg-[#FF6B9E]' },
          { id: 'colors-basic', name: 'Màu sắc cơ bản', emoji: '🎨', color: 'bg-[#34A4E4]' },
        ];
      }
    } else if (selectedAge === '4-5') {
      if (mathSection) {
        mathSection.items = [
          { id: 'math-patterns-3', name: 'Qui tắc sắp xếp 3 đối tượng', emoji: '🧩', color: 'bg-[#FFD13B]', videoId: 'I2Y3pyFd7uQ' },
          { id: 'math-count-5', name: 'Đếm đến 5. Nhận biết chữ số 5', emoji: '🖐️', color: 'bg-[#FF6B9E]', videoId: 'aKpQjINn7fg' },
          { id: 'math-ordinal-5', name: 'Số thứ tự trong phạm vi 5', emoji: '🔢', color: 'bg-[#34A4E4]', videoId: 'icMt1EzhcaI' },
          { id: 'math-measure', name: 'Đo độ dài của đối tượng', emoji: '📏', color: 'bg-[#8DE065]', videoId: 'VwJYKmaudKc' },
          { id: 'math-right-left-other', name: 'Phía phải, phía trái so với người khác', emoji: '↔️', color: 'bg-[#FFD13B]', videoId: '4q454GefMm8' },
          { id: 'math-equal-relation', name: 'Mối quan hệ nhiều bằng nhau', emoji: '⚖️', color: 'bg-[#FF6B9E]', videoId: 'rWFztLVWuL0' },
          { id: 'math-more-less-relation', name: 'Mối quan hệ nhiều hơn, ít hơn', emoji: '⚖️', color: 'bg-[#34A4E4]', videoId: 'rWFztLVWuL0' },
          { id: 'math-count-3-new', name: 'Đếm đến 3. Nhận biết chữ số 3', emoji: '3️⃣', color: 'bg-[#8DE065]', videoId: 'kXmMUGdD-yU' },
          { id: 'math-ordinal-3', name: 'Số thứ tự trong phạm vi 3', emoji: '🔢', color: 'bg-[#FFD13B]', videoId: 'lUT1LnBcbaE' },
          { id: 'math-split-5', name: 'Tách nhóm 5 thành 2 phần', emoji: '✂️', color: 'bg-[#FF6B9E]', videoId: 'v5nqso6YoWQ' },
        ];
      }
      if (scienceSection) {
        scienceSection.items = [
          { id: 'wild-animals', name: 'Động vật hoang dã', emoji: '🦁', color: 'bg-[#FF6B9E]' },
          { id: 'plant-needs', name: 'Cây cần gì để sống?', emoji: '💧', color: 'bg-[#34A4E4]' },
          { id: 'weather-fun', name: 'Thời tiết quanh bé', emoji: '🌈', color: 'bg-[#8DE065]' },
          { id: 'cay-ngo', name: 'Quá trình phát triển của cây ngô', emoji: '🌽', color: 'bg-[#FFD13B]', videoId: 'mS7PLFk9dpQ' },
          { id: 'hoa-sen', name: 'Tìm hiểu về hoa sen', emoji: '🪷', color: 'bg-[#FF6B9E]', videoId: 'QRfhEEq7_Zo' },
          { id: 'vong-doi-kien', name: 'Vòng đời của loài kiến', emoji: '🐜', color: 'bg-[#34A4E4]', videoId: 'IrUQGsES7lc' },
          { id: 'cac-loai-ca', name: 'Khám phá các loài cá', emoji: '🐟', color: 'bg-[#8DE065]', videoId: 'vylufagWb_I' },
          { id: 'dong-vat-mau-da', name: 'Động vật theo màu da', emoji: '🦓', color: 'bg-[#FFD13B]', videoId: 'EXKNfAbMtVo' },
          { id: 'dong-vat-song-o-dau', name: 'Động vật sống ở đâu?', emoji: '🏠', color: 'bg-[#FF6B9E]', videoId: 'mJrJLEezRFo' },
          { id: 'dong-vat-4-chan', name: 'Động vật đi bằng 4 chân', emoji: '🐕', color: 'bg-[#34A4E4]', videoId: 'jRcu4ROfzjI' },
          { id: 'plant-parts-new', name: 'Tìm hiểu một số bộ phận của cây', emoji: '🌳', color: 'bg-[#8DE065]', videoId: '_jmJkFXZku4' },
          { id: 'bean-growth', name: 'Quá trình phát triển của cây đỗ', emoji: '🫘', color: 'bg-[#FFD13B]', videoId: 'Vr7-M0l2rVI' },
          { id: 'rice-growth', name: 'Quá trình phát triển của cây lúa', emoji: '🌾', color: 'bg-[#FF6B9E]', videoId: 'dyJMbiX_FKg' },
          { id: 'flower-classification', name: 'Phân biệt hoa cánh tròn, cánh dài', emoji: '🌸', color: 'bg-[#34A4E4]', videoId: 'cwjYFppK8Cs' },
          { id: 'tree-benefits', name: 'Ích lợi của cây xanh', emoji: '🌳', color: 'bg-[#8DE065]', videoId: 'O5UA66vhbmU' },
        ];
      }
      if (classificationSection) {
        classificationSection.items = [
          { id: 'tall-short', name: 'Cao – thấp', emoji: '🦒', color: 'bg-[#FF6B9E]' },
          { id: 'colors-adv', name: 'Phối màu sắc', emoji: '🎨', color: 'bg-[#34A4E4]' },
        ];
      }
    } else if (selectedAge === '5-6') {
      if (mathSection) {
        mathSection.items = [
          { id: 'numbers-1-20', name: 'Thử thách số 1–20', emoji: '🌟', color: 'bg-[#FF6B9E]', value: 20 },
          { id: 'addition-basic', name: 'Phép cộng vui vẻ', emoji: '➕', color: 'bg-[#34A4E4]' },
          { id: 'patterns-advanced', name: 'Quy luật phức tạp', emoji: '🧩', color: 'bg-[#FFD13B]' },
          { id: 'math-pair-objects', name: 'Ghép thành cặp đối tượng liên quan', emoji: '🔗', color: 'bg-[#FF6B9E]', videoId: 'ZRBSlbkuW3Y' },
          { id: 'math-count-6', name: 'NB chữ số 6, SL, STT (PV 6)', emoji: '6️⃣', color: 'bg-[#34A4E4]', videoId: '8wU27-jZH1E' },
          { id: 'math-split-6', name: 'Tách 6 đối tượng thành 2 phần', emoji: '✂️', color: 'bg-[#8DE065]', videoId: 'PNsHLgQWncs' },
          { id: 'math-count-7', name: 'NB chữ số 7, SL, STT (PV 7)', emoji: '7️⃣', color: 'bg-[#FFD13B]', videoId: '4F4H-wF5O9Q' },
          { id: 'math-compare-3-groups-7', name: 'So sánh 3 nhóm đối tượng (PV 7)', emoji: '⚖️', color: 'bg-[#FF6B9E]', videoId: '63j7veOEBz4' },
          { id: 'math-count-9', name: 'NB chữ số 9, SL, STT (PV 9)', emoji: '9️⃣', color: 'bg-[#34A4E4]', videoId: 'v9O0q9Z74Fo' },
          { id: 'math-number-meaning', name: 'Ý nghĩa của các con số', emoji: '🔢', color: 'bg-[#8DE065]', videoId: 'QSHO3kKx-MM' },
        ];
      }
      if (scienceSection) {
        scienceSection.items = [
          { id: 'life-cycles', name: 'Vòng đời sinh trưởng', emoji: '🦋', color: 'bg-[#FF6B9E]' },
          { id: 'environment', name: 'Bảo vệ môi trường', emoji: '🌍', color: 'bg-[#34A4E4]' },
          { id: 'space', name: 'Khám phá vũ trụ', emoji: '🚀', color: 'bg-[#8DE065]' },
          { id: 'vong-tuan-hoan-nuoc', name: 'Vòng tuần hoàn của nước', emoji: '💧', color: 'bg-[#FFD13B]', videoId: 'hvDzG60cq0I' },
          { id: 'dan-toc-thai', name: 'Tìm hiểu về dân tộc Thái Việt Nam', emoji: '🏘️', color: 'bg-[#FF6B9E]', videoId: '2itNKerzmEs' },
          { id: 'bao-ve-moi-truong-be', name: 'Bé bảo vệ môi trường', emoji: '♻️', color: 'bg-[#34A4E4]', videoId: 'cDOZGlbAyb0' },
          { id: 'su-dung-dien-an-toan', name: 'Sử dụng điện an toàn', emoji: '⚡', color: 'bg-[#8DE065]', videoId: '6o2JKPJOUGA' },
          { id: 'xu-ly-duoi-nuoc', name: 'Xử lý khi gặp đuối nước', emoji: '🌊', color: 'bg-[#FFD13B]', videoId: 'idJw6WAu5m1Cpd8v' },
          { id: 'wind-discovery', name: 'Tìm hiểu về gió', emoji: '🌬️', color: 'bg-[#FF6B9E]', videoId: 'U9LkQaX2YDw' },
          { id: 'egg-magic', name: 'Sự kỳ diệu của quả trứng', emoji: '🥚', color: 'bg-[#34A4E4]', videoId: 'Nt2eASSvDRU' },
          { id: 'transportation-discovery', name: 'Một số phương tiện giao thông', emoji: '🚗', color: 'bg-[#8DE065]', videoId: 'LIzirahWZSg' },
          { id: 'seasons-discovery', name: 'Các mùa trong năm', emoji: '🍂', color: 'bg-[#FFD13B]', videoId: '71aDil4_fao' },
          { id: 'space-objects', name: 'Mặt trăng, mặt trời và các vì sao', emoji: '✨', color: 'bg-[#FF6B9E]', videoId: 'a8s58FYCepA' },
          { id: 'waste-classification', name: 'Phân loại rác', emoji: '🗑️', color: 'bg-[#34A4E4]', videoId: 'OETc0LuzyKs' },
        ];
      }
      if (classificationSection) {
        classificationSection.items = [
          { id: 'long-short', name: 'Dài – ngắn (Đo lường)', emoji: '📏', color: 'bg-[#FF6B9E]' },
          { id: 'heavy-light', name: 'Nặng – nhẹ', emoji: '⚖️', color: 'bg-[#34A4E4]' },
        ];
      }
    }
    
    return sections;
  };

  const renderCognitiveGrid = () => (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 gap-4">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedSection(null)}
            className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </motion.button>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
            Phát Triển Nhận Thức
          </h2>
        </div>
        <div className="bg-[#FFD13B]/20 text-amber-700 font-bold py-2 px-4 rounded-full shadow-sm flex items-center gap-2 border-2 border-[#FFD13B]/50">
          🏆 Huy hiệu: Nhà khám phá nhí
        </div>
      </div>

      {getCognitiveSections().map((section: any, sIdx: number) => (
        <div key={sIdx} className="mb-12 bg-white/40 p-6 rounded-[3rem] border-4 border-white/50 shadow-sm">
          <h3 className="text-2xl font-black text-sky-800 mb-6 px-4">{section.title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {section.items.map((item: any, index: number) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedItem(item);
                  if (!isGeneratingAudio) {
                    setIsGeneratingAudio(true);
                    speak(item.name).finally(() => setIsGeneratingAudio(false));
                  }
                }}
                className={`${item.color} rounded-[2rem] p-4 sm:p-6 flex flex-col items-center justify-center gap-3 shadow-lg border-4 border-white/50 relative overflow-hidden group aspect-square`}
              >
                {item.isNew && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm z-20 animate-bounce">
                    MỚI
                  </div>
                )}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-colors"></div>
                <span className="text-6xl sm:text-7xl drop-shadow-md">{item.emoji}</span>
                <span className="text-lg sm:text-xl font-bold text-white text-center leading-tight z-10 drop-shadow-md">
                  {item.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAestheticView = () => (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 gap-4">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedSection(null);
              speak("Quay lại");
            }}
            className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </motion.button>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
            Phát Triển Thẩm Mỹ
          </h2>
        </div>
        <div className="bg-[#E5D9FF] text-purple-700 font-bold py-2 px-4 rounded-full shadow-sm flex items-center gap-2 border-2 border-purple-300">
          🎨 Huy hiệu: Họa sĩ tí hon
        </div>
      </div>

      {selectedAge ? (
        (() => {
          let sections = [];
          if (selectedAge === 'toddler') sections = AESTHETIC_TODDLER_SECTIONS;
          else if (selectedAge === '3-4') sections = AESTHETIC_3_4_SECTIONS;
          else if (selectedAge === '4-5') sections = AESTHETIC_4_5_SECTIONS;
          else if (selectedAge === '5-6') sections = AESTHETIC_5_6_SECTIONS;
          
          if (sections.length === 0) {
            return (
              <div className="bg-white/80 backdrop-blur-md p-12 rounded-[3rem] shadow-xl border-4 border-white text-center max-w-lg mx-auto mt-10">
                <span className="text-8xl mb-6 block">🚧</span>
                <h3 className="text-3xl font-black text-slate-700 mb-4">Phần này đang được xây dựng!</h3>
                <p className="text-xl text-slate-500 font-bold">Bé hãy quay lại sau nhé.</p>
              </div>
            );
          }

          return sections.map((section: any, sIdx: number) => (
            <div key={sIdx} className="mb-12 bg-white/40 p-6 rounded-[3rem] border-4 border-white/50 shadow-sm">
              <h3 className="text-2xl font-black text-purple-800 mb-6 px-4">{section.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {section.items.map((item: any, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedItem(item);
                      if (!isGeneratingAudio) {
                        setIsGeneratingAudio(true);
                        speak(item.name).finally(() => setIsGeneratingAudio(false));
                      }
                    }}
                    className={`${item.color} rounded-[2rem] p-4 sm:p-6 flex flex-col items-center justify-center gap-3 shadow-lg border-4 border-white/50 relative overflow-hidden group aspect-square`}
                  >
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-colors"></div>
                    <span className="text-6xl sm:text-7xl drop-shadow-md">{item.emoji}</span>
                    <span className="text-lg sm:text-xl font-bold text-white text-center leading-tight z-10 drop-shadow-md">
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          ));
        })()
      ) : null}
    </div>
  );

  const renderGrid = (items: any[], type: string) => (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedSection(null);
              speak("Quay lại");
            }}
            className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </motion.button>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
            {CATEGORIES.find(c => c.id === type)?.title}
          </h2>
        </div>
        {type === 'language' && (
          <div className="flex bg-white/50 p-1 rounded-full shadow-inner border border-white/60">
            <button
              onClick={() => setLetterLang('vi')}
              className={`px-4 py-2 rounded-full font-bold transition-colors ${letterLang === 'vi' ? 'bg-emerald-400 text-white shadow-md' : 'text-slate-500 hover:bg-white/50'}`}
            >
              Tiếng Việt
            </button>
            <button
              onClick={() => setLetterLang('en')}
              className={`px-4 py-2 rounded-full font-bold transition-colors ${letterLang === 'en' ? 'bg-blue-400 text-white shadow-md' : 'text-slate-500 hover:bg-white/50'}`}
            >
              English
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleItemClick(item)}
            className={`${item.color || 'bg-white'} rounded-3xl p-6 flex flex-col items-center justify-center gap-3 shadow-lg border-4 border-white/60 aspect-square relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
            {type === 'cognitive' ? (
              <span className="text-6xl sm:text-7xl font-black text-slate-700 drop-shadow-sm">{item.value}</span>
            ) : type === 'language' ? (
              <span className="text-6xl sm:text-7xl font-black text-slate-700 drop-shadow-sm">{item.id}</span>
            ) : (
              <span className="text-6xl sm:text-7xl drop-shadow-md">{item.emoji}</span>
            )}
            <span className="text-xl sm:text-2xl font-bold text-slate-700 text-center leading-tight z-10">
              {type === 'cognitive' ? item.name.split(' – ')[1] : type === 'language' ? item.id : item.name.replace('Con ', '')}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderLanguageView = () => {
    if (selectedAge) {
      let stories: any[] = [];
      let poems: any[] = [];

      if (selectedAge === 'toddler') {
        stories = STORIES_TODDLER;
        poems = POEMS_TODDLER;
      } else if (selectedAge === '3-4') {
        stories = STORIES_3_4;
        poems = POEMS_3_4;
      } else if (selectedAge === '4-5') {
        stories = STORIES_4_5;
        poems = POEMS_4_5;
      } else if (selectedAge === '5-6') {
        stories = STORIES_5_6;
        poems = POEMS_5_6;
      }

      return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50 gap-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedSection(null)}
                className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
              >
                <ArrowLeft size={28} strokeWidth={3} />
              </motion.button>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
                Phát triển ngôn ngữ
              </h2>
            </div>
            {selectedAge !== 'toddler' && selectedAge !== '3-4' && (
              <div className="flex bg-white/50 p-1 rounded-full shadow-inner border border-white/60">
                <button
                  onClick={() => {
                    setLetterLang('vi');
                    speak("Tiếng Việt");
                  }}
                  className={`px-4 py-2 rounded-full font-bold transition-colors ${letterLang === 'vi' ? 'bg-emerald-400 text-white shadow-md' : 'text-slate-500 hover:bg-white/50'}`}
                >
                  Tiếng Việt
                </button>
                <button
                  onClick={() => {
                    setLetterLang('en');
                    speak("English");
                  }}
                  className={`px-4 py-2 rounded-full font-bold transition-colors ${letterLang === 'en' ? 'bg-blue-400 text-white shadow-md' : 'text-slate-500 hover:bg-white/50'}`}
                >
                  English
                </button>
              </div>
            )}
          </div>

          <div className="space-y-12">
            {selectedAge === '5-6' && (
              <section>
                <h3 className="text-2xl font-black text-emerald-800 mb-6 flex items-center gap-2">
                  <span className="bg-emerald-100 p-2 rounded-xl">✍️</span> Bài học chữ cái
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {LETTER_LESSONS_5_6.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleItemClick(item)}
                      className="bg-white p-6 rounded-[2rem] shadow-lg border-4 border-emerald-100 flex items-center gap-4 text-left group"
                    >
                      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        {item.emoji}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-slate-700 text-lg leading-tight">{item.name}</h4>
                        <span className="text-emerald-500 font-bold text-sm">Xem bài học 📺</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>
            )}

            {selectedAge !== 'toddler' && selectedAge !== '3-4' && (
              <section>
                <h3 className="text-2xl font-black text-sky-800 mb-6 flex items-center gap-2">
                  <span className="bg-sky-100 p-2 rounded-xl">🔤</span> Bảng chữ cái
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                  {(letterLang === 'vi' ? LETTERS : ENGLISH_LETTERS).map((item, index) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleItemClick(item)}
                      className={`${item.color || 'bg-white'} rounded-3xl p-6 flex flex-col items-center justify-center gap-3 shadow-lg border-4 border-white/60 aspect-square relative overflow-hidden`}
                    >
                      <span className="text-6xl font-black text-slate-700">{item.id}</span>
                      <span className="text-xl font-bold text-slate-700">{item.id}</span>
                    </motion.button>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-2xl font-black text-pink-800 mb-6 flex items-center gap-2">
                <span className="bg-pink-100 p-2 rounded-xl">📚</span> Truyện kể cho bé
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stories.map((item, index) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item)}
                    className="bg-white rounded-3xl p-6 flex items-center gap-6 shadow-xl border-4 border-pink-50 text-left group"
                  >
                    <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                    <div>
                      <h4 className="text-xl font-black text-slate-700">{item.name}</h4>
                      <p className="text-slate-500 font-bold">Xem truyện video 📺</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-black text-emerald-800 mb-6 flex items-center gap-2">
                <span className="bg-emerald-100 p-2 rounded-xl">📜</span> Thơ mầm non
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {poems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item)}
                    className="bg-white rounded-3xl p-6 flex items-center gap-6 shadow-xl border-4 border-emerald-50 text-left group"
                  >
                    <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                    <div>
                      <h4 className="text-xl font-black text-slate-700">{item.name}</h4>
                      <p className="text-slate-500 font-bold">Xem thơ video 📺</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>
          </div>
        </div>
      );
    }

    return renderGrid(letterLang === 'vi' ? LETTERS : ENGLISH_LETTERS, 'language');
  };

  const renderAIAssistant = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [storyKeyword, setStoryKeyword] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleAskAI = async (textPrompt: string = prompt, audioBlob?: Blob) => {
      if (!textPrompt.trim() && !audioBlob) return;
      setIsLoading(true);
      setResponse('');
      try {
        let contents: any = textPrompt;
        
        if (audioBlob) {
          const reader = new FileReader();
          const base64Audio = await new Promise<string>((resolve) => {
            reader.onloadend = () => {
              const base64 = (reader.result as string).split(',')[1];
              resolve(base64);
            };
            reader.readAsDataURL(audioBlob);
          });

          contents = {
            parts: [
              {
                inlineData: {
                  mimeType: audioBlob.type,
                  data: base64Audio
                }
              },
              { text: textPrompt || 'Hãy trả lời câu hỏi trong đoạn ghi âm này.' }
            ]
          };
        }

        // Voice Control Logic
        const lowerPrompt = textPrompt.toLowerCase();
        if (lowerPrompt.includes('mở bài học vẽ') || lowerPrompt.includes('vẽ')) {
          setCurrentView('aesthetic');
          setSelectedSection('lessons');
          setResponse('Vâng ạ! Trợ lý AI đang mở phần bài học vẽ cho bé đây.');
          speak('Vâng ạ! Trợ lý AI đang mở phần bài học vẽ cho bé đây.');
          return;
        } else if (lowerPrompt.includes('về trang chủ') || lowerPrompt.includes('trang chủ')) {
          setCurrentTab('home');
          setCurrentView('home');
          setResponse('Đã về trang chủ rồi bé ơi!');
          speak('Đã về trang chủ rồi bé ơi!');
          return;
        }

        const result = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: contents,
          config: {
            systemInstruction: "Bạn là một trợ lý ảo thân thiện, đáng yêu dành cho trẻ mầm non (4-5 tuổi). Bạn có nhiệm vụ trả lời các câu hỏi của bé một cách CHÍNH XÁC NHẤT về mặt khoa học và thực tế, nhưng phải dùng ngôn ngữ đơn giản, dễ hiểu, vui nhộn, và sử dụng nhiều emoji. Nếu bé yêu cầu sáng tác thơ, truyện ngắn, hoặc bài hát thiếu nhi, hãy sáng tạo một cách trong sáng và mang tính giáo dục. Nếu bé nói một từ khóa, hãy kể một câu chuyện cực ngắn (khoảng 3-4 câu) về từ khóa đó.",
            tools: [{ googleSearch: {} }],
          }
        });
        const aiText = result.text || 'Xin lỗi bé, trợ lý đang bận một chút. Bé thử lại sau nhé!';
        setResponse(aiText);
        speak(aiText);
      } catch (error) {
        console.error("AI Error:", error);
        setResponse('Xin lỗi bé, có lỗi xảy ra. Bé thử lại sau nhé!');
      } finally {
        setIsLoading(false);
      }
    };

    const handleStorytelling = async () => {
      if (!storyKeyword.trim()) return;
      setIsLoading(true);
      setResponse('');
      try {
        const result = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Hãy kể một câu chuyện ngắn, vui nhộn và giáo dục cho trẻ mầm non về: ${storyKeyword}`,
          config: {
            systemInstruction: "Bạn là người kể chuyện cho trẻ em. Hãy kể một câu chuyện ngắn khoảng 100 chữ, ngôn ngữ sinh động, giàu hình ảnh và có bài học nhẹ nhàng.",
          }
        });
        const story = result.text || 'Câu chuyện đang được viết tiếp bé ơi...';
        setResponse(story);
        speak(story);
      } catch (error) {
        setResponse('Ôi, trợ lý quên mất câu chuyện rồi. Bé nhắc lại từ khóa nhé!');
      } finally {
        setIsLoading(false);
      }
    };

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          handleAskAI(prompt, audioBlob);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Không thể truy cập micro. Vui lòng kiểm tra quyền truy cập.");
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    };

    return (
      <motion.div key="ai-assistant" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="min-h-screen flex flex-col items-center pt-20 pb-40 relative z-10 px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 sm:p-12 rounded-[3rem] shadow-xl border-4 border-white w-full max-w-3xl flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl drop-shadow-md">🤖</span>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-sky-800">Trợ lý AI của bé</h2>
              <p className="text-lg text-sky-700 font-bold">Hỏi đáp, kể chuyện, làm thơ, hát ca!</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <section className="mb-6">
              <h3 className="text-2xl font-black text-sky-800 mb-4 flex items-center gap-2">
                <span className="bg-sky-100 p-2 rounded-xl">📖</span> Kể chuyện sáng tạo
              </h3>
              <div className="bg-sky-50 p-6 rounded-[2.5rem] border-4 border-white shadow-inner flex flex-col gap-4">
                <p className="text-sky-700 font-bold italic">Bé hãy nhập một từ khóa (ví dụ: Con thỏ, Mặt trăng) để trợ lý AI kể chuyện nhé!</p>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={storyKeyword}
                    onChange={(e) => setStoryKeyword(e.target.value)}
                    placeholder="Nhập từ khóa..."
                    className="flex-1 bg-white rounded-full px-6 py-4 text-xl font-bold text-slate-700 border-4 border-sky-100 focus:outline-none focus:border-sky-300 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStorytelling}
                    disabled={isLoading}
                    className="bg-sky-500 text-white p-4 rounded-full shadow-lg"
                  >
                    <Sparkles size={28} />
                  </motion.button>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-2xl font-black text-purple-800 mb-4 flex items-center gap-2">
                <span className="bg-purple-100 p-2 rounded-xl">💬</span> Trò chuyện & Điều khiển
              </h3>
              <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Bé muốn hỏi gì hay muốn nghe kể chuyện gì nào? (Ví dụ: Kể cho bé nghe một câu chuyện về thỏ con)"
                className="w-full p-6 pr-16 rounded-3xl border-4 border-sky-100 bg-white/50 focus:bg-white focus:border-sky-300 outline-none resize-none h-32 text-lg text-slate-700 font-medium shadow-inner transition-all placeholder:text-slate-400"
              />
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`absolute bottom-4 right-4 p-3 rounded-full shadow-md transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-sky-100 text-sky-600 hover:bg-sky-200'}`}
                title={isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
              >
                {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAskAI(prompt)}
              disabled={isLoading || (!prompt.trim() && !isRecording)}
              className="bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black text-xl py-4 px-8 rounded-full shadow-lg border-4 border-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Đang suy nghĩ... 🤔</span>
              ) : (
                <>Gửi cho Trợ lý <Sparkles size={24} /></>
              )}
            </motion.button>
          </section>
        </div>

          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-sky-50/80 p-6 sm:p-8 rounded-[2rem] border-2 border-sky-200 shadow-sm relative"
              >
                <button
                  onClick={() => {
                    if (!isGeneratingAudio) {
                      setIsGeneratingAudio(true);
                      speak(response).finally(() => setIsGeneratingAudio(false));
                    }
                  }}
                  className={`absolute top-4 right-4 p-3 bg-white hover:bg-sky-100 rounded-full text-sky-500 transition-colors shadow-sm border border-sky-100 ${isGeneratingAudio ? 'animate-pulse opacity-70' : ''}`}
                >
                  <Volume2 size={24} strokeWidth={3} />
                </button>
                <div className="prose prose-lg text-slate-700 font-medium whitespace-pre-wrap pr-12">
                  {response}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const renderRecords = () => {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setUploadedFiles(prev => [...prev, { url, name: file.name, type }]);
        speak(`Bé đã tải ${type === 'image' ? 'ảnh' : 'video'} lên thành công! Giỏi lắm!`);
      }
    };

    return (
      <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">
        <div className="flex items-center mb-8 gap-4 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedSection(null)}
            className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </motion.button>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
            Ghi nhận kết quả
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-xl border-4 border-white flex flex-col items-center gap-8">
          <div className="text-center">
            <span className="text-8xl mb-4 block">📸</span>
            <h3 className="text-3xl font-black text-sky-800 mb-2">Khoảnh khắc của bé</h3>
            <p className="text-xl text-sky-600 font-bold">Tải lên những hình ảnh hoặc video bài tập của bé nhé!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <label className="cursor-pointer bg-gradient-to-r from-pink-400 to-rose-500 text-white font-black text-xl py-4 px-8 rounded-full shadow-xl border-4 border-white hover:scale-105 transition-transform flex items-center gap-3">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
              <ImageIcon size={28} />
              <span>Tải ảnh lên</span>
            </label>

            <label className="cursor-pointer bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black text-xl py-4 px-8 rounded-full shadow-xl border-4 border-white hover:scale-105 transition-transform flex items-center gap-3">
              <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} />
              <Video size={28} />
              <span>Tải video lên</span>
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full mt-8">
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-lg relative group bg-slate-100"
              >
                {file.type === 'image' ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <video src={file.url} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Star size={40} className="text-yellow-400 fill-yellow-400" />
                   {file.type === 'video' && <Video size={40} className="text-white absolute top-2 right-2" />}
                </div>
              </motion.div>
            ))}
            {uploadedFiles.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 font-bold italic">
                Chưa có nội dung nào được tải lên. Bé hãy bắt đầu ghi lại những khoảnh khắc đẹp nhé!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-32 pt-12">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border-4 border-white">
        <h2 className="text-4xl font-black text-slate-700 mb-8 flex items-center gap-4">
          <span className="bg-slate-100 p-3 rounded-2xl">⚙️</span> Cài đặt cho Phụ huynh
        </h2>

        <div className="space-y-10">
          <section>
            <h3 className="text-2xl font-black text-sky-800 mb-6">Giới hạn thời gian học (Screen Time)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[15, 20, 30].map((limit) => (
                <motion.button
                  key={limit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSessionTimeLimit(limit);
                    setSessionTimeLeft(limit * 60);
                    speak(`Đã cài đặt thời gian học là ${limit} phút.`);
                  }}
                  className={`p-6 rounded-[2rem] border-4 transition-all flex flex-col items-center gap-2 ${sessionTimeLimit === limit ? 'bg-sky-500 border-sky-200 text-white shadow-lg' : 'bg-white border-sky-50 text-sky-700 hover:bg-sky-50'}`}
                >
                  <span className="text-3xl font-black">{limit}</span>
                  <span className="font-bold">Phút</span>
                </motion.button>
              ))}
            </div>
            <p className="mt-4 text-slate-500 font-medium italic">Sau khi hết thời gian, ứng dụng sẽ nhắc nhở bé nghỉ ngơi và tập thể dục mắt.</p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-purple-800 mb-6">Âm thanh & Giọng nói</h3>
            <div className="flex items-center justify-between p-6 bg-purple-50 rounded-[2rem] border-2 border-purple-100">
              <div>
                <p className="font-black text-purple-900 text-xl">Giọng nói trợ lý</p>
                <p className="text-purple-700 font-medium">Giọng bé gái dễ thương</p>
              </div>
              <Volume2 className="text-purple-500" size={40} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderEyeExercise = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gradient-to-b from-sky-400 to-blue-600"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[4rem] p-12 max-w-2xl w-full shadow-2xl border-8 border-white text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-4 bg-sky-200"></div>
        
        <div className="mb-8">
          <span className="text-[10rem] block animate-bounce">🐰</span>
          <h2 className="text-4xl font-black text-sky-800 mb-4">Mắt tớ mỏi rồi bé ơi!</h2>
          <p className="text-2xl text-sky-600 font-bold italic">"Chúng mình cùng đi uống nước và nhìn ra xa một lát nhé!"</p>
        </div>

        <div className="bg-sky-50 p-8 rounded-[3rem] border-4 border-sky-100 mb-10">
          <h3 className="text-2xl font-black text-slate-700 mb-6">Bài tập thể dục mắt đơn giản</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">⬆️⬇️</span>
              <p className="font-bold text-slate-600">Nhìn lên xuống</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">⬅️➡️</span>
              <p className="font-bold text-slate-600">Nhìn trái phải</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">🔄</span>
              <p className="font-bold text-slate-600">Xoay tròn mắt</p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowEyeExercise(false);
            setShowSessionEndModal(true);
          }}
          className="bg-sky-500 text-white font-black text-2xl py-6 px-12 rounded-full shadow-xl border-4 border-white"
        >
          Nghỉ ngơi thôi nào! 💤
        </motion.button>
      </motion.div>
    </motion.div>
  );

  const renderReports = () => {
    const reportData = [
      { name: 'Thứ 2', score: 85 },
      { name: 'Thứ 3', score: 92 },
      { name: 'Thứ 4', score: 78 },
      { name: 'Thứ 5', score: 95 },
      { name: 'Thứ 6', score: 88 },
      { name: 'Thứ 7', score: 100 },
      { name: 'CN', score: 90 },
    ];

    const categoryData = [
      { name: 'Thể chất', value: 80 },
      { name: 'Nhận thức', value: 95 },
      { name: 'Ngôn ngữ', value: 85 },
      { name: 'Tình cảm', value: 90 },
      { name: 'Thẩm mỹ', value: 75 },
    ];

    return (
      <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">
        <div className="flex items-center mb-8 gap-4 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedSection(null);
              speak("Quay lại");
            }}
            className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </motion.button>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
            Báo cáo tiến bộ
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-xl border-4 border-white">
            <h3 className="text-2xl font-black text-sky-800 mb-6">Tiến độ học tập tuần này</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#34A4E4" strokeWidth={4} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-xl border-4 border-white">
            <h3 className="text-2xl font-black text-sky-800 mb-6">Phát triển toàn diện</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8DE065" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-xl border-4 border-white">
            <h3 className="text-2xl font-black text-sky-800 mb-6 flex items-center gap-3">
              <Sparkles className="text-yellow-500" />
              Nhận xét của giáo viên & Trợ lý AI
            </h3>
            <div className="space-y-6">
              <div className="bg-sky-50 p-6 rounded-3xl border-2 border-sky-100">
                <p className="text-lg text-slate-700 font-bold italic">
                  "Bé rất chăm chỉ và có tiến bộ vượt bậc ở mảng Nhận thức, đặc biệt là các con số. Bé cần được khuyến khích thêm ở các hoạt động vận động tinh và sáng tạo nghệ thuật."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-200 rounded-full flex items-center justify-center text-xl">👩‍🏫</div>
                  <span className="font-black text-sky-800">Cô Nga</span>
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100">
                <p className="text-lg text-slate-700 font-bold italic">
                  "Dựa trên dữ liệu học tập, bé hoàn thành 95% các bài tập toán học. Trợ lý AI gợi ý bé nên thử sức với các bài kể chuyện tiếng Anh để phát triển ngôn ngữ song song."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-xl">🤖</div>
                  <span className="font-black text-purple-800">Trợ lý AI Mầm Non</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLearningSections = () => {
    const category = CATEGORIES.find(c => c.id === currentView);
    const ageGroup = AGE_GROUPS.find(a => a.id === selectedAge);
    
    return (
      <div className="flex flex-col items-center w-full pt-12 pb-40 relative z-10 px-4">
        <div className="flex items-center mb-12 gap-4 sticky top-4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-[28px] shadow-sm border-2 border-white w-full max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setSelectedAge(null);
              speak("Quay lại chọn lứa tuổi");
            }}
            className="p-3 sm:p-4 bg-white rounded-full shadow-md text-sky-500 border-2 border-sky-100"
          >
            <ArrowLeft size={28} strokeWidth={3} />
          </motion.button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-700 capitalize">
              {category?.title}
            </h2>
            <p className="text-sky-600 font-bold text-sm sm:text-base">Lứa tuổi: {ageGroup?.name}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto w-full">
          {LEARNING_SECTIONS.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedSection(section.id);
                speak(section.title);
              }}
              className={`${section.color} rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center gap-4 shadow-lg border-4 border-white/60 relative overflow-hidden group min-h-[220px] w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]`}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:bg-white/40 transition-colors"></div>
              <span className="text-6xl sm:text-7xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">{section.icon}</span>
              <div className="text-center z-10">
                <h3 className="text-2xl font-black text-slate-800 mb-2">{section.title}</h3>
                <p className="text-slate-700 font-bold bg-white/40 px-4 py-1 rounded-full text-sm inline-block backdrop-blur-sm">{section.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans selection:bg-transparent bg-gradient-to-b from-[#CDEBFF] via-[#FFF4B8]/30 to-[#C8F7DC]/40 relative overflow-x-hidden">
      {/* Global Grass Bottom */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-[#C8F7DC] rounded-t-[100%] scale-x-150 transform origin-bottom z-0 opacity-60 pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#CDEBFF] to-[#FFD6E8]"
          >
            {/* Splash Decorations */}
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 50, ease: "linear" }} className="absolute -top-20 -right-20 text-[200px] opacity-50">🌞</motion.div>
            <motion.div animate={{ x: [0, 50, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute top-1/4 left-10 text-6xl opacity-70">☁️</motion.div>
            <motion.div animate={{ x: [0, -50, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} className="absolute bottom-1/4 right-10 text-7xl opacity-70">☁️</motion.div>
            
            <motion.div
              animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-[12rem] drop-shadow-2xl mb-8 relative"
            >
              🐰🎒
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute top-0 right-0 text-5xl">✨</motion.div>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl sm:text-7xl font-black text-sky-800 drop-shadow-md text-center px-4"
            >
              Mầm Non Vui Học
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-3xl text-sky-700/90 font-bold mt-6 text-center px-4 bg-white/40 py-2 px-6 rounded-full backdrop-blur-sm mb-12"
            >
              Khám phá mỗi ngày – Lớn khôn từng bước
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={async () => {
                if (!audioCtx) {
                  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                }
                if (audioCtx.state === 'suspended') {
                  await audioCtx.resume();
                }
                setShowSplash(false);
                setShowCheckIn(true);
                speak("Chào mừng bé đến với Mầm Non Vui Học! Hôm nay bé thấy thế nào?");
              }}
              className="bg-white text-sky-600 font-black text-4xl py-8 px-16 rounded-full shadow-2xl border-8 border-white hover:bg-sky-50 transition-colors flex items-center gap-4"
            >
              Bắt đầu học thôi! 🚀
            </motion.button>
          </motion.div>
        ) : currentTab === 'assistant' ? (
          renderAIAssistant()
        ) : currentTab === 'parents' ? (
          <div className="min-h-screen pb-32">
            <ParentDashboard onBack={() => {
              setCurrentTab('home');
              speak("Quay lại trang chủ");
            }} stars={stars} emotionHistory={emotionHistory} speak={speak} />
          </div>
        ) : currentTab === 'settings' ? (
          renderSettings()
        ) : currentTab === 'achievements' ? (
          <motion.div key="achievements" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="min-h-screen flex flex-col items-center pt-20 pb-40 relative z-10 px-4">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border-4 border-white w-full max-w-3xl flex flex-col items-center gap-8">
              <Trophy size={100} className="text-yellow-400 drop-shadow-lg" />
              <h2 className="text-4xl font-black text-sky-800">Thành tích của bé</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="bg-yellow-50 p-8 rounded-[2rem] border-2 border-yellow-100 flex flex-col items-center gap-4">
                  <Star size={60} className="text-yellow-400 fill-yellow-400" />
                  <div className="text-4xl font-black text-yellow-700">{stars}</div>
                  <div className="text-lg font-bold text-yellow-600">Ngôi sao đã nhận</div>
                </div>
                
                <div className="bg-sky-50 p-8 rounded-[2rem] border-2 border-sky-100 flex flex-col items-center gap-4">
                  <Trophy size={60} className="text-sky-400" />
                  <div className="text-4xl font-black text-sky-700">{Math.floor(stars / 10)}</div>
                  <div className="text-lg font-bold text-sky-600">Cúp vinh quang</div>
                </div>
              </div>

              <div className="w-full">
                <h3 className="text-2xl font-black text-slate-700 mb-6">Huy hiệu đã đạt được</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {stars >= 1 && <div className="bg-emerald-100 p-4 rounded-2xl border-2 border-emerald-200 flex flex-col items-center gap-2">
                    <span className="text-4xl">🌱</span>
                    <span className="font-bold text-emerald-700">Mầm non</span>
                  </div>}
                  {stars >= 10 && <div className="bg-blue-100 p-4 rounded-2xl border-2 border-blue-200 flex flex-col items-center gap-2">
                    <span className="text-4xl">🚀</span>
                    <span className="font-bold text-blue-700">Nhà thám hiểm</span>
                  </div>}
                  {stars >= 30 && <div className="bg-purple-100 p-4 rounded-2xl border-2 border-purple-200 flex flex-col items-center gap-2">
                    <span className="text-4xl">🎓</span>
                    <span className="font-bold text-purple-700">Thông thái</span>
                  </div>}
                  {stickers.map((sticker, idx) => (
                    <div key={idx} className="bg-yellow-100 p-4 rounded-2xl border-2 border-yellow-200 flex flex-col items-center gap-2">
                      <span className="text-4xl">{sticker.split(' ')[0]}</span>
                      <span className="font-bold text-yellow-700">{sticker.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                  {stars === 0 && stickers.length === 0 && <p className="text-slate-400 font-bold italic">Bé hãy học thật chăm để nhận huy hiệu nhé!</p>}
                </div>
              </div>
            </div>
          </motion.div>
        ) : currentTab === 'home' ? (
          currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen flex flex-col relative z-10"
            >
              <div className="flex-1 flex items-start justify-center">
                {renderHome()}
              </div>
            </motion.div>
          ) : !selectedAge ? (
            <motion.div
              key="age-selection"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen flex flex-col relative z-10"
            >
              {renderAgeSelection(currentView)}
            </motion.div>
          ) : !selectedSection ? (
            <motion.div
              key="learning-sections"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen flex flex-col relative z-10"
            >
              {renderLearningSections()}
            </motion.div>
          ) : selectedSection === 'lessons' ? (
            <React.Fragment key="category-view">
              {currentView === 'language' && (
                <motion.div key="language" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderLanguageView()}
                </motion.div>
              )}
              {currentView === 'cognitive' && (
                <motion.div key="cognitive" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderCognitiveGrid()}
                </motion.div>
              )}
              {currentView === 'aesthetic' && (
                <motion.div key="aesthetic" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderAestheticView()}
                </motion.div>
              )}
              {currentView === 'physical' && selectedAge === 'toddler' && (
                <motion.div key="physical-toddler" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderGrid(PHYSICAL_TODDLER_ACTIVITIES, 'physical')}
                </motion.div>
              )}
              {currentView === 'physical' && selectedAge === '3-4' && (
                <motion.div key="physical-3-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderGrid(PHYSICAL_3_4_ACTIVITIES, 'physical')}
                </motion.div>
              )}
              {currentView === 'physical' && selectedAge === '4-5' && (
                <motion.div key="physical-4-5" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderGrid(PHYSICAL_4_5_ACTIVITIES, 'physical')}
                </motion.div>
              )}
              {currentView === 'physical' && selectedAge === '5-6' && (
                <motion.div key="physical-5-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderGrid(PHYSICAL_5_6_ACTIVITIES, 'physical')}
                </motion.div>
              )}
              {currentView === 'social' && (selectedAge === 'toddler' || selectedAge === '3-4' || selectedAge === '4-5' || selectedAge === '5-6') && (
                <motion.div key={`social-${selectedAge}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
                  {renderGrid(
                    selectedAge === 'toddler' ? SOCIAL_TODDLER_ACTIVITIES :
                    selectedAge === '3-4' ? SOCIAL_3_4_ACTIVITIES :
                    selectedAge === '4-5' ? SOCIAL_4_5_ACTIVITIES :
                    SOCIAL_5_6_ACTIVITIES, 
                    'social'
                  )}
                </motion.div>
              )}
              {['social'].includes(currentView) && !['toddler', '3-4', '4-5', '5-6'].includes(selectedAge) && (
                <motion.div key="coming-soon" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 flex flex-col items-center pt-20 pb-20">
                  <div className="flex items-center mb-8 gap-4 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedSection(null)}
                      className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
                    >
                      <ArrowLeft size={28} strokeWidth={3} />
                    </motion.button>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
                      {CATEGORIES.find(c => c.id === currentView)?.title}
                    </h2>
                  </div>
                  <div className="bg-white/80 backdrop-blur-md p-12 rounded-[3rem] shadow-xl border-4 border-white text-center max-w-lg mx-4 mt-10">
                    <span className="text-8xl mb-6 block">🚧</span>
                    <h3 className="text-3xl font-black text-slate-700 mb-4">Phần này đang được xây dựng!</h3>
                    <p className="text-xl text-slate-500 font-bold">Bé hãy quay lại sau nhé.</p>
                  </div>
                </motion.div>
              )}
            </React.Fragment>
          ) : selectedSection === 'games' && (currentView === 'cognitive' || currentView === 'language' || currentView === 'physical' || currentView === 'social' || currentView === 'aesthetic') ? (
            <motion.div key="interactive-games" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
              {activeMathGame ? (
                <MathGame 
                  game={MATH_GAMES_DATA.find(g => g.id === activeMathGame)!}
                  onBack={() => setActiveMathGame(null)}
                  onComplete={(newStars) => {
                    setStars(prev => prev + newStars);
                    setActiveMathGame(null);
                  }}
                  speak={speak}
                />
              ) : (
                <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-24">
                  <div className="flex items-center mb-8 gap-4 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedSection(null);
                        speak("Quay lại");
                      }}
                      className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
                    >
                      <ArrowLeft size={28} strokeWidth={3} />
                    </motion.button>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
                      Trò chơi tương tác
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {MATH_GAMES_DATA.filter(game => {
                      const isAgeMatch = !game.ageGroups || (selectedAge && game.ageGroups.includes(selectedAge));
                      if (!isAgeMatch) return false;
                      
                      const isLanguageGame = game.id.startsWith('game-') || game.id.startsWith('language-');
                      const isPhysicalGame = game.id.startsWith('physical-');
                      const isSocialGame = game.id.startsWith('social-');
                      const isAestheticGame = game.id.startsWith('aesthetic-');
                      
                      if (currentView === 'language') return isLanguageGame;
                      if (currentView === 'physical') return isPhysicalGame;
                      if (currentView === 'social') return isSocialGame;
                      if (currentView === 'aesthetic') return isAestheticGame;
                      if (currentView === 'cognitive') return !isLanguageGame && !isPhysicalGame && !isSocialGame && !isAestheticGame;
                      
                      return true;
                    }).map((game) => (
                      <motion.button
                        key={game.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveMathGame(game.id);
                          speak(game.title);
                        }}
                        className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 shadow-xl border-4 border-sky-100 relative overflow-hidden group min-h-[220px]"
                      >
                        {game.id === 'counting-1-5' && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md z-20 animate-bounce">
                            MỚI
                          </div>
                        )}
                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-sky-50 rounded-full blur-2xl group-hover:bg-sky-100 transition-colors"></div>
                        <span className="text-8xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {
                            game.id.includes('numbers') ? '🔢' : 
                            game.id.includes('compare') ? '⚖️' : 
                            game.id.includes('shapes') ? '🔺' : 
                            game.id.includes('patterns') ? '🧩' : 
                            game.id.includes('addition') ? '➕' : 
                            game.id.includes('count') ? '🖐️' :
                            game.id.includes('ordinal') ? '🔢' :
                            game.id.includes('measure') ? '📏' :
                            game.id.includes('right-left') ? '↔️' :
                            game.id.includes('big-small') ? '🐘' :
                            game.id.includes('one-many') ? '🔢' :
                            game.id.includes('animals') ? '🐥' :
                            game.id.includes('vehicles') ? '🚲' :
                            game.id.startsWith('physical-') ? '🏃' :
                            game.id.startsWith('game-') ? (game.title.includes('Truyện') ? '📖' : '📜') :
                            game.id.includes('language') ? '📚' :
                            game.id === 'counting-1-5' ? '🍎' : '🧩'
                          }
                        </span>
                        <h3 className="text-3xl font-black text-sky-800 text-center">{game.title}</h3>
                        <p className="text-sky-600 font-bold bg-sky-50 px-6 py-2 rounded-full">{game.questions.length} Câu hỏi vui nhộn!</p>
                      </motion.button>
                    ))}

                  </div>
                </div>
              )}
            </motion.div>
          ) : selectedSection === 'records' ? (
            <motion.div key="records-section" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
              {renderRecords()}
            </motion.div>
          ) : selectedSection === 'reports' ? (
            <motion.div key="reports-section" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 pb-20">
              {renderReports()}
            </motion.div>
          ) : (
            <motion.div key="coming-soon-section" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="min-h-screen relative z-10 flex flex-col items-center pt-20 pb-20">
              <div className="flex items-center mb-8 gap-4 sticky top-4 z-10 bg-sky-50/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white/50">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedSection(null);
                    speak("Quay lại");
                  }}
                  className="p-3 bg-white rounded-full shadow-md text-sky-500 border border-sky-100"
                >
                  <ArrowLeft size={28} strokeWidth={3} />
                </motion.button>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-700 capitalize">
                  {LEARNING_SECTIONS.find(s => s.id === selectedSection)?.title}
                </h2>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-12 rounded-[3rem] shadow-xl border-4 border-white text-center max-w-lg mx-4 mt-10">
                <span className="text-8xl mb-6 block">🚧</span>
                <h3 className="text-3xl font-black text-slate-700 mb-4">Phần này đang được xây dựng!</h3>
                <p className="text-xl text-slate-500 font-bold">Bé hãy quay lại sau nhé.</p>
              </div>
            </motion.div>
          )
        ) : (
          <motion.div key="other-tab" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="min-h-screen flex flex-col items-center justify-center pt-20 pb-32">
            <div className="bg-white/80 backdrop-blur-md p-12 rounded-[3rem] shadow-xl border-4 border-white text-center max-w-lg mx-4">
              <span className="text-8xl mb-6 block">🚧</span>
              <h3 className="text-3xl font-black text-slate-700 mb-4">Phần này đang được xây dựng!</h3>
              <p className="text-xl text-slate-500 font-bold">Bé hãy quay lại sau nhé.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {renderBottomNav()}

      {/* Eye Exercise Modal */}
      <AnimatePresence>
        {showEyeExercise && renderEyeExercise()}
      </AnimatePresence>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {showBreathing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-red-400/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[4rem] p-12 max-w-2xl w-full shadow-2xl border-8 border-white text-center relative overflow-hidden"
            >
              <button
                onClick={() => setShowBreathing(false)}
                className="absolute top-6 right-6 p-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
              >
                <X size={32} strokeWidth={3} />
              </button>
              
              <div className="mb-8">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[10rem] block"
                >
                  🎈
                </motion.div>
                <h2 className="text-4xl font-black text-red-800 mb-4">Cùng thổi bong bóng nào!</h2>
                <p className="text-2xl text-red-600 font-bold italic">"Hít vào thật sâu... và thở ra thật mạnh để thổi bong bóng to nhé!"</p>
              </div>

              <div className="flex justify-center gap-8 mb-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl animate-pulse">🌬️</div>
                  <p className="font-bold text-slate-600">Hít vào</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-4xl animate-bounce">💨</div>
                  <p className="font-bold text-slate-600">Thở ra</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowBreathing(false);
                  speak("Bé làm tốt lắm! Bé đã thấy thoải mái hơn chưa nào?");
                }}
                className="bg-red-500 text-white font-black text-2xl py-6 px-12 rounded-full shadow-xl border-4 border-white"
              >
                Con thấy nhẹ lòng rồi! 😊
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for selected item */}
      <AnimatePresence>
        {showCheckIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border-8 border-sky-100 max-w-2xl w-full text-center relative overflow-hidden"
            >
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-sky-50 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-pink-50 rounded-full blur-3xl opacity-50"></div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-sky-800 mb-4">Check-in cảm xúc</h2>
              <p className="text-2xl sm:text-3xl text-sky-600 font-bold mb-12 italic">Hôm nay bé thấy thế nào?</p>
              
              <div className="flex justify-center gap-6 sm:gap-10 mb-8">
                {[
                  { id: 'vui', emoji: '😊', label: 'Vui vẻ', color: 'bg-yellow-100 border-yellow-200 text-yellow-700' },
                  { id: 'buon', emoji: '😢', label: 'Buồn bã', color: 'bg-blue-100 border-blue-200 text-blue-700' },
                  { id: 'tuc-gian', emoji: '😠', label: 'Tức giận', color: 'bg-red-100 border-red-200 text-red-700' }
                ].map((emotion) => (
                  <motion.button
                    key={emotion.id}
                    whileHover={{ scale: 1.1, y: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEmotionSelect(emotion.id)}
                    className={`${emotion.color} rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center gap-4 border-4 shadow-xl transition-all hover:shadow-2xl`}
                  >
                    <span className="text-7xl sm:text-8xl drop-shadow-md">{emotion.emoji}</span>
                    <span className="text-xl font-black uppercase tracking-wider">{emotion.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-50 flex flex-col ${selectedItem.color || 'bg-white'} overflow-hidden`}
            onClick={(e) => {
              if (!isGeneratingAudio) {
                setIsGeneratingAudio(true);
                const { text, lang } = getItemSpeechText(selectedItem);
                speak(text, false, lang).finally(() => setIsGeneratingAudio(false));
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeItem();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-4 bg-white/60 hover:bg-white rounded-full text-slate-600 transition-colors z-20 shadow-sm"
            >
              <X size={32} strokeWidth={3} />
            </button>

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 w-full h-full z-10">
              {selectedItem.videoId ? (
                <div className="w-full h-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${selectedItem.videoId}?autoplay=1`} 
                    title={selectedItem.name} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              ) : selectedItem.externalLink ? (
                <div className="w-full h-full flex flex-col">
                  <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md border-b-2 border-slate-100">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <span>{selectedItem.emoji}</span> {selectedItem.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(selectedItem.externalLink, '_blank');
                      }}
                      className="px-4 py-2 bg-sky-500 text-white rounded-full font-bold text-sm shadow-md hover:bg-sky-600 transition-colors flex items-center gap-2"
                    >
                      Mở trong cửa sổ mới ↗️
                    </button>
                  </div>
                  <div className="flex-1 w-full rounded-b-3xl overflow-hidden shadow-2xl border-x-8 border-b-8 border-white bg-white">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={selectedItem.externalLink} 
                      title={selectedItem.name} 
                      frameBorder="0" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : currentView === 'cognitive' && selectedItem.value ? (
                <div className="flex flex-col items-center gap-8">
                  <span className="text-[12rem] sm:text-[18rem] font-black text-slate-800 leading-none drop-shadow-2xl">
                    {selectedItem.value}
                  </span>
                  <div className="flex flex-wrap justify-center gap-4 max-w-2xl bg-white/40 p-8 rounded-[3rem]">
                    {Array.from({ length: selectedItem.value || 0 }).map((_, i) => (
                      <motion.span 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: 'spring' }}
                        className="text-6xl sm:text-7xl drop-shadow-lg"
                      >
                        {selectedItem.emoji}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ) : currentView === 'language' ? (
                <div className="flex flex-col items-center gap-8">
                  <span className="text-[12rem] sm:text-[18rem] font-black text-slate-800 leading-none drop-shadow-2xl">
                    {selectedItem.id}
                  </span>
                  <div className="flex items-center gap-6 bg-white/60 px-12 py-6 rounded-full shadow-lg border-4 border-white">
                    <span className="text-7xl sm:text-8xl drop-shadow-lg">{selectedItem.emoji}</span>
                    <span className="text-5xl sm:text-6xl font-bold text-slate-700">{selectedItem.word}</span>
                  </div>
                  
                  {/* Pronunciation Practice Button */}
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePronunciationPractice();
                      }}
                      disabled={isPracticing}
                      className={`p-6 rounded-full shadow-xl border-4 border-white flex items-center gap-3 ${isPracticing ? 'bg-red-500 text-white animate-pulse' : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white'}`}
                    >
                      <Mic size={32} />
                      <span className="text-2xl font-black">Bé tập đọc</span>
                    </motion.button>
                    {pronunciationFeedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/90 px-6 py-3 rounded-2xl shadow-md border-2 border-pink-100 text-xl font-bold text-pink-600"
                      >
                        {pronunciationFeedback}
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                <motion.span 
                  animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-[15rem] sm:text-[20rem] drop-shadow-2xl"
                >
                  {selectedItem.emoji}
                </motion.span>
              )}
            </div>

            {(!selectedItem.videoId && !selectedItem.externalLink) && (
              <div className="p-8 pb-12 w-full flex justify-center z-10">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-white/90 backdrop-blur-md px-12 py-6 rounded-full flex items-center justify-center gap-6 shadow-xl border-4 border-white cursor-pointer ${isGeneratingAudio ? 'opacity-70' : ''}`}
                >
                  <Volume2 size={48} className={`text-sky-500 ${isGeneratingAudio ? 'animate-pulse' : ''}`} strokeWidth={3} />
                  <h3 className="text-4xl sm:text-5xl font-black text-slate-800 capitalize">
                    {currentView === 'language' 
                      ? (letterLang === 'vi' ? selectedItem.name.split(' – ')[1] || selectedItem.name : selectedItem.word)
                      : selectedItem.name}
                  </h3>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session End Modal */}
      <AnimatePresence>
        {showSessionEndModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-8 border-sky-100 text-center relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-50 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-50 rounded-full blur-3xl"></div>
              
              <span className="text-9xl mb-6 block drop-shadow-lg">⏰😴</span>
              <h2 className="text-4xl font-black text-sky-800 mb-4">Hết giờ học rồi!</h2>
              <p className="text-xl text-slate-600 font-bold mb-8 leading-relaxed">
                Bé đã học rất chăm chỉ trong 30 phút vừa qua. Bây giờ là lúc để đôi mắt và cơ thể được nghỉ ngơi nhé!
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowSessionEndModal(false);
                  setSessionTimeLeft(30 * 60);
                  setIsTimerRunning(true);
                }}
                className="bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black text-2xl py-5 px-10 rounded-full shadow-xl border-4 border-white"
              >
                Đã hiểu ạ! ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer Display (Optional, subtle) */}
      <div className="fixed top-4 left-4 z-40">
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border-2 border-white flex items-center gap-2">
          <span className="text-xl">⏳</span>
          <span className="font-black text-sky-800 tabular-nums">
            {Math.floor(sessionTimeLeft / 60)}:{(sessionTimeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
