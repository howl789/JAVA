export type ColumnType = 'dropdown' | 'multiselect';

export interface Column {
  id: string;
  name: string;
  type: ColumnType;
  options: string[];
}

export interface Cell {
  columnId: string;
  value: string | string[];
}

export interface PromptRow {
  id: string;
  cells: Cell[];
}

export interface AIModel {
  id: string;
  name: string;
  formatString: string;
}

export interface ExportFormat {
  id: string;
  name: string;
  extension: string;
}

export const columns: Column[] = [
  {
    id: 'subject',
    name: 'Subject',
    type: 'dropdown',
    options: ['Girl', 'Boy', 'Mecha', 'Kitsune', 'Warrior', 'Dragon', 'Samurai', 'Witch', 'Cat Girl']
  },
  {
    id: 'style',
    name: 'Style',
    type: 'dropdown',
    options: ['Cel shading', 'Watercolor', '90s Anime', 'Modern Anime', 'Sketch', 'Manga', 'Chibi']
  },
  {
    id: 'setting',
    name: 'Setting/Environment',
    type: 'dropdown',
    options: ['Tokyo at night', 'Shrine', 'Floating Islands', 'School', 'Beach', 'Castle', 'Space station', 'Cyberpunk city']
  },
  {
    id: 'mood',
    name: 'Mood/Emotion',
    type: 'dropdown',
    options: ['Peaceful', 'Mysterious', 'Angry', 'Happy', 'Sad', 'Energetic', 'Mystical', 'Romantic']
  },
  {
    id: 'lighting',
    name: 'Lighting',
    type: 'dropdown',
    options: ['Neon', 'Sunset', 'Overcast', 'Firelight', 'Moonlight', 'Daylight', 'Studio lighting']
  },
  {
    id: 'camera',
    name: 'Camera Angle',
    type: 'dropdown',
    options: ['Close-up', 'Bird\'s-eye', 'Dutch angle', 'Wide shot', 'Profile', 'Over the shoulder']
  },
  {
    id: 'extraTags',
    name: 'Extra Tags',
    type: 'multiselect',
    options: ['Rain', 'Sparkles', 'Cherry blossoms', 'Magical effects', 'Lens flare', 'Motion blur', 'Dramatic pose']
  },
  {
    id: 'artistStyle',
    name: 'Artist Style',
    type: 'dropdown',
    options: ['Makoto Shinkai', 'Ghibli', 'Retro aesthetic', 'Satoshi Kon', 'Masashi Kishimoto', 'Akira Toriyama']
  },
  {
    id: 'negativePrompts',
    name: 'Negative Prompts',
    type: 'multiselect',
    options: ['Ugly', 'Blurry', 'Low-res', 'Extra limbs', 'Disfigured', 'Bad anatomy', 'Bad proportions', 'Out of frame']
  }
];

export const initialRows: PromptRow[] = [
  {
    id: '1',
    cells: [
      { columnId: 'subject', value: 'Girl' },
      { columnId: 'style', value: 'Cel shading' },
      { columnId: 'setting', value: 'Tokyo at night' },
      { columnId: 'mood', value: 'Peaceful' },
      { columnId: 'lighting', value: 'Neon' },
      { columnId: 'camera', value: 'Dutch angle' },
      { columnId: 'extraTags', value: ['Rain', 'Sparkles'] },
      { columnId: 'artistStyle', value: 'Makoto Shinkai' },
      { columnId: 'negativePrompts', value: ['Blurry', 'Low-res'] }
    ]
  },
  {
    id: '2',
    cells: [
      { columnId: 'subject', value: 'Mecha' },
      { columnId: 'style', value: '90s Anime' },
      { columnId: 'setting', value: 'Floating Islands' },
      { columnId: 'mood', value: 'Mysterious' },
      { columnId: 'lighting', value: 'Sunset' },
      { columnId: 'camera', value: 'Bird\'s-eye' },
      { columnId: 'extraTags', value: [] },
      { columnId: 'artistStyle', value: 'Retro aesthetic' },
      { columnId: 'negativePrompts', value: ['Ugly', 'Extra limbs'] }
    ]
  },
  {
    id: '3',
    cells: [
      { columnId: 'subject', value: 'Kitsune' },
      { columnId: 'style', value: 'Watercolor' },
      { columnId: 'setting', value: 'Shrine' },
      { columnId: 'mood', value: 'Mystical' },
      { columnId: 'lighting', value: 'Firelight' },
      { columnId: 'camera', value: 'Close-up' },
      { columnId: 'extraTags', value: ['Cherry blossoms'] },
      { columnId: 'artistStyle', value: 'Ghibli' },
      { columnId: 'negativePrompts', value: [] }
    ]
  }
];

export const aiModels: AIModel[] = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    formatString: '--v 5 --ar 16:9'
  },
  {
    id: 'dalle',
    name: 'DALL·E',
    formatString: ''
  },
  {
    id: 'leonardo',
    name: 'Leonardo.ai',
    formatString: ''
  },
  {
    id: 'other',
    name: 'Other',
    formatString: ''
  }
];

export const digitalProductTypes = [
  {
    id: 'art-print',
    name: 'Art Print'
  },
  {
    id: 'wallpaper',
    name: 'Digital Wallpaper'
  },
  {
    id: 'illustration',
    name: 'Book Illustration'
  },
  {
    id: 'nft',
    name: 'NFT/Digital Collectible'
  },
  {
    id: 'social-media',
    name: 'Social Media Content'
  },
  {
    id: 'thumbnail',
    name: 'Video Thumbnail'
  },
  {
    id: 'character-design',
    name: 'Character Design'
  },
  {
    id: 'other',
    name: 'Other'
  }
];

export const exportFormats: ExportFormat[] = [
  {
    id: 'txt',
    name: 'Plain Text (.txt)',
    extension: 'txt'
  },
  {
    id: 'csv',
    name: 'CSV (.csv)',
    extension: 'csv'
  },
  {
    id: 'json',
    name: 'JSON (.json)',
    extension: 'json'
  }
];

export const themePresets = [
  { 
    name: 'Ultimate Anime Preset', 
    settings: { 
      subject: 'Girl',
      style: 'Modern Anime', 
      setting: 'Tokyo at night', 
      mood: 'Mystical',
      lighting: 'Neon',
      camera: 'Dutch angle',
      extraTags: ['Cherry blossoms', 'Magical effects', 'Sparkles'],
      artistStyle: 'Makoto Shinkai',
      negativePrompts: ['Blurry', 'Low-res', 'Bad anatomy']
    } 
  }
];
