export interface Artist {
  id: string;
  name: string;
  state: string;
  specialization: string;
  experience: string;
  languages: string[];
  teachingMode: 'Online' | 'Offline' | 'Hybrid';
  bio: string;
  skills: string[];
  price: number;
  email: string;
  phone: string;
  social: {
    instagram?: string;
    whatsapp?: string;
    website?: string;
  };
  rating: number;
  reviewsCount: number;
  avatar: string;
  portfolio: string[];
  demoVideos: {
    id: string;
    title: string;
    thumbnail: string;
    url: string;
  }[];
}

export const ARTISTS_DATA: Artist[] = [
  // Karnataka
  {
    id: 'a1',
    name: 'Gopal Hegde',
    state: 'Karnataka',
    specialization: 'Yakshagana Performance',
    experience: '15 years',
    languages: ['Kannada', 'English', 'Hindi'],
    teachingMode: 'Hybrid',
    bio: 'Renowned Yakshagana artist specializing in Tenkutittu style. Dedicated to teaching the intricate dance-drama forms of coastal Karnataka.',
    skills: ['Yakshagana makeup', 'Tenkutittu dance', 'Tala rhythm', 'Storytelling'],
    price: 1500,
    email: 'gopal.hegde@artisan.mail',
    phone: '+91 98765 43210',
    social: { instagram: '@yaksha_gopal', whatsapp: '+91 98765 43210' },
    rating: 4.9,
    reviewsCount: 45,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    portfolio: ['https://images.unsplash.com/photo-1590050752117-23a9d7fc2113'],
    demoVideos: [
      { id: 'v1', title: 'The Art of Yakshagana Makeup', thumbnail: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc2113', url: '#' }
    ]
  },
  {
    id: 'a2',
    name: 'Lakshmi Narayan',
    state: 'Karnataka',
    specialization: 'Mysore Silk Weaving',
    experience: '25 years',
    languages: ['Kannada', 'Hindi'],
    teachingMode: 'Offline',
    bio: 'Master weaver from the heart of Mysore, preserving the secret techniques of pure gold zari silk weaving.',
    skills: ['Loom setup', 'Silk dyeing', 'Gold zari pattern design'],
    price: 2000,
    email: 'lakshmi.weaver@silk.mail',
    phone: '+91 98765 43211',
    social: { whatsapp: '+91 98765 43211' },
    rating: 5.0,
    reviewsCount: 128,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  {
    id: 'a3',
    name: 'Suresh Channapatna',
    state: 'Karnataka',
    specialization: 'Wooden Toy Craft',
    experience: '10 years',
    languages: ['Kannada', 'English'],
    teachingMode: 'Hybrid',
    bio: 'Award-winning artisan bringing modern designs to the ancient craft of Channapatna wooden toys.',
    skills: ['Wood turning', 'Natural lacquer dyeing', 'Toy design'],
    price: 800,
    email: 'suresh.toys@craft.mail',
    phone: '+91 98765 43212',
    social: { instagram: '@suresh_toys' },
    rating: 4.8,
    reviewsCount: 32,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  // Tamil Nadu
  {
    id: 'a4',
    name: 'Meera Krishnan',
    state: 'Tamil Nadu',
    specialization: 'Bharatanatyam & Tanjore Painting',
    experience: '12 years',
    languages: ['Tamil', 'English'],
    teachingMode: 'Hybrid',
    bio: 'Traditional Bharatanatyam performer and Tanjore artist passionate about preserving South Indian culture through immersive workshops.',
    skills: ['Bharatanatyam basics', 'Temple expressions', 'Classical storytelling', 'Traditional painting techniques'],
    price: 1200,
    email: 'meera.dance@art.mail',
    phone: '+91 98765 43213',
    social: { instagram: '@meera_dance_studio', whatsapp: '+91 98765 43213' },
    rating: 4.9,
    reviewsCount: 88,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  {
    id: 'a5',
    name: 'Ranganathan S.',
    state: 'Tamil Nadu',
    specialization: 'Kanchipuram Silk Weaving',
    experience: '30 years',
    languages: ['Tamil'],
    teachingMode: 'Offline',
    bio: 'Legacy weaver from Kanchipuram, specializing in the Korvai weaving technique.',
    skills: ['Korvai weaving', 'Temple border design', 'Silk authentication'],
    price: 2500,
    email: 'ranga.silk@heritage.mail',
    phone: '+91 98765 43214',
    social: {},
    rating: 5.0,
    reviewsCount: 210,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  {
    id: 'a6',
    name: 'Anitha Murali',
    state: 'Tamil Nadu',
    specialization: 'Carnatic Vocal',
    experience: '20 years',
    languages: ['Tamil', 'English', 'Telugu'],
    teachingMode: 'Online',
    bio: 'Carnatic musician and dedicated teacher focused on voice culture and raga improvisation.',
    skills: ['Vocal basics', 'Raga Alapana', 'Kriti rendition'],
    price: 1000,
    email: 'anitha.vocal@music.mail',
    phone: '+91 98765 43215',
    social: { instagram: '@anitha_carnatic' },
    rating: 4.7,
    reviewsCount: 56,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  // Rajasthan
  {
    id: 'a7',
    name: 'Vikram Rajput',
    state: 'Rajasthan',
    specialization: 'Blue Pottery',
    experience: '18 years',
    languages: ['Hindi', 'English', 'Marwari'],
    teachingMode: 'Hybrid',
    bio: 'Preserving the iconic Jaipur Blue Pottery. My workshops focus on the unique clay mixture and cobalt blue glazes.',
    skills: ['Quartz powder dough', 'Freehand painting', 'Glazing techniques'],
    price: 1800,
    email: 'vikram.pottery@jaipur.mail',
    phone: '+91 98765 43216',
    social: { instagram: '@jaipur_blue_arts' },
    rating: 4.8,
    reviewsCount: 72,
    avatar: 'https://images.unsplash.com/photo-1542178243-bc20204b7694?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  {
    id: 'a8',
    name: 'Savitri Devi',
    state: 'Rajasthan',
    specialization: 'Mandana Painting',
    experience: '40 years',
    languages: ['Hindi', 'Marwari'],
    teachingMode: 'Offline',
    bio: 'Elderly guardian of Mandana folk art. I teach the spiritual and mathematical patterns used to decorate mud houses.',
    skills: ['Natural pigment preparation', 'Geometric patterns', 'Spiritual motifs'],
    price: 500,
    email: 'savitri.mandana@folk.mail',
    phone: '+91 98765 43217',
    social: {},
    rating: 5.0,
    reviewsCount: 310,
    avatar: 'https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  // Kerala
  {
    id: 'a9',
    name: 'Manoj Panicker',
    state: 'Kerala',
    specialization: 'Kathakali Performance',
    experience: '20 years',
    languages: ['Malayalam', 'English', 'Hindi'],
    teachingMode: 'Hybrid',
    bio: 'Master Kathakali performer focused on Mudras (hand gestures) and Navarasas (facial expressions).',
    skills: ['Mudra language', 'Chutti makeup', 'Facial muscle control'],
    price: 1300,
    email: 'manoj.kathakali@kerala.mail',
    phone: '+91 98765 43218',
    social: { instagram: '@manoj_kathakali_official' },
    rating: 4.9,
    reviewsCount: 94,
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  {
    id: 'a10',
    name: 'Reshmi Nair',
    state: 'Kerala',
    specialization: 'Mohiniyattam Dance',
    experience: '15 years',
    languages: ['Malayalam', 'English'],
    teachingMode: 'Hybrid',
    bio: 'Exponent of Mohiniyattam, the dance of the enchantress. Focus on grace and lyrical movements.',
    skills: ['Chari movements', 'Abhinaya', 'Traditional attire styling'],
    price: 1100,
    email: 'reshmi.dance@kerala.mail',
    phone: '+91 98765 43220',
    social: { instagram: '@reshmi_mohiniyattam' },
    rating: 4.8,
    reviewsCount: 42,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  {
    id: 'a11',
    name: 'Kiran Das',
    state: 'Kerala',
    specialization: 'Mural Painting',
    experience: '22 years',
    languages: ['Malayalam', 'English', 'Tamil'],
    teachingMode: 'Online',
    bio: 'Specialist in Kerala Murals, using natural pigments to depict divine stories on canvas and walls.',
    skills: ['Pancha varna theory', 'Shading techniques', 'Natural pigment making'],
    price: 1600,
    email: 'kiran.mural@art.mail',
    phone: '+91 98765 43221',
    social: { instagram: '@kerala_mural_artist' },
    rating: 4.9,
    reviewsCount: 61,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  },
  // Rajasthan (Add 3rd)
  {
    id: 'a12',
    name: 'Arjun Shekhawat',
    state: 'Rajasthan',
    specialization: 'Puppetry (Kathputli)',
    experience: '12 years',
    languages: ['Hindi', 'English', 'Rajasthani'],
    teachingMode: 'Online',
    bio: 'Bringing the stories of Rajasthan to life through traditional string puppetry. Master puppeteer and storyteller.',
    skills: ['String control', 'Live narration', 'Puppet making', 'Folk songs'],
    price: 900,
    email: 'arjun.puppet@folk.mail',
    phone: '+91 98765 43219',
    social: { instagram: '@rajasthan_puppets' },
    rating: 4.6,
    reviewsCount: 28,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    portfolio: [],
    demoVideos: []
  }
];
