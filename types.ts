export enum ArtStyle {
  PHOTOREALISTIC = 'Photorealistic',
  ANIME = 'Anime',
  CINEMATIC = 'Cinematic',
  SURREAL = 'Surreal',
  WATERCOLOR = 'Watercolor',
  MOEBIUS = 'Moebius style',
  HYPERREALISTIC = 'Hyper-realistic'
}

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: ArtStyle;
  aspectRatio: AspectRatio;
  timestamp: number;
  isEdit?: boolean;
}