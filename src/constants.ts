import { Animal, Color, NumberItem } from './types';

export const ANIMALS: Animal[] = [
  { id: 'cat', name: 'Con mèo', image: 'https://picsum.photos/seed/cat/200/200', soundText: 'Mèo kêu meo meo', type: 'animal' },
  { id: 'dog', name: 'Con chó', image: 'https://picsum.photos/seed/dog/200/200', soundText: 'Chó sủa gâu gâu', type: 'animal' },
  { id: 'duck', name: 'Con vịt', image: 'https://picsum.photos/seed/duck/200/200', soundText: 'Vịt kêu cạp cạp', type: 'animal' },
  { id: 'cow', name: 'Con bò', image: 'https://picsum.photos/seed/cow/200/200', soundText: 'Bò kêu ụm bò', type: 'animal' },
  { id: 'chicken', name: 'Con gà', image: 'https://picsum.photos/seed/chicken/200/200', soundText: 'Gà gáy ò ó o', type: 'animal' },
  { id: 'pig', name: 'Con lợn', image: 'https://picsum.photos/seed/pig/200/200', soundText: 'Lợn kêu ụt ịt', type: 'animal' },
];

export const COLORS: Color[] = [
  { id: 'red', name: 'Màu đỏ', image: '', soundText: 'Đây là màu đỏ', type: 'color', hex: '#ef4444' },
  { id: 'blue', name: 'Màu xanh dương', image: '', soundText: 'Đây là màu xanh dương', type: 'color', hex: '#3b82f6' },
  { id: 'green', name: 'Màu xanh lá', image: '', soundText: 'Đây là màu xanh lá', type: 'color', hex: '#22c55e' },
  { id: 'yellow', name: 'Màu vàng', image: '', soundText: 'Đây là màu vàng', type: 'color', hex: '#eab308' },
  { id: 'orange', name: 'Màu cam', image: '', soundText: 'Đây là màu cam', type: 'color', hex: '#f97316' },
  { id: 'purple', name: 'Màu tím', image: '', soundText: 'Đây là màu tím', type: 'color', hex: '#a855f7' },
];

export const NUMBERS: NumberItem[] = [
  { id: '1', name: 'Số một', image: '', soundText: 'Số một', type: 'number', value: 1 },
  { id: '2', name: 'Số hai', image: '', soundText: 'Số hai', type: 'number', value: 2 },
  { id: '3', name: 'Số ba', image: '', soundText: 'Số ba', type: 'number', value: 3 },
  { id: '4', name: 'Số bốn', image: '', soundText: 'Số bốn', type: 'number', value: 4 },
  { id: '5', name: 'Số năm', image: '', soundText: 'Số năm', type: 'number', value: 5 },
];
