export interface GameItem {
  id: string;
  name: string;
  image: string;
  soundText: string;
}

export interface Animal extends GameItem {
  type: 'animal';
}

export interface Color extends GameItem {
  type: 'color';
  hex: string;
}

export interface NumberItem extends GameItem {
  type: 'number';
  value: number;
}

export type GameType = 'animals' | 'colors' | 'numbers' | 'home';
