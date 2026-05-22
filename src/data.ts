export interface Memory {
  id: string;
  imageUrl: string;
  hindiCaption: string;
  englishCaption: string;
  timePeriod: string;
  bgGlow: string;
}

export interface PanchangTrait {
  title: string;
  desc: string;
}

export interface PanchangInfo {
  name: string;
  dob: string;
  rashi: string;
  nakshatra: string;
  tithi: string;
  yoga: string;
  karan: string;
  rashiLord: string;
  element: string;
  luckyColor: string;
  luckyNumber: string;
  mantra: string;
  traits: PanchangTrait[];
}

export const MEMORIES: Memory[] = [
  {
    id: "mem1",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468117634-1a530c8c-0244-4c1b-8fae-f3a0b60f2722.jpg",
    hindiCaption: "मुस्कान जो हर शाम रोशन कर दे ✨",
    englishCaption: "A radiant smile that lights up any dusk - our foundational journey.",
    timePeriod: "The Golden Era",
    bgGlow: "from-amber-500/20 to-orange-500/10"
  },
  {
    id: "mem2",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468196653-e013ff4b-5888-4158-aeb0-a8c56860da31.jpg",
    hindiCaption: "अनंत हँसी और बेफिक्र बातें ❤️",
    englishCaption: "Worry-free laughter and conversations that stretch into the early mornings.",
    timePeriod: "Midnight Chronicles",
    bgGlow: "from-purple-500/20 to-pink-500/10"
  },
  {
    id: "mem3",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468245108-ea85eaeb-b8ff-40d9-ac8a-1653be8ffb48.jpg",
    hindiCaption: "नीले आसमान तले नए ख्वाब 🌌",
    englishCaption: "Chasing new aspirations under infinite indigo skies.",
    timePeriod: "Wanderlust Days",
    bgGlow: "from-blue-500/20 to-teal-500/10"
  },
  {
    id: "mem4",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468370196-a96f25f3-372b-4485-a1b5-fbb2228b58ac.jpg",
    hindiCaption: "अटूट विश्वास और साया बनकर साथ चलना 🤝",
    englishCaption: "Unshakable trust and always standing as a shielding wall against any storm.",
    timePeriod: "Brotherhood & Trust",
    bgGlow: "from-emerald-500/20 to-teal-500/10"
  },
  {
    id: "mem5",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468409065-902be70d-d9e2-4f4c-9c64-7814008ab5fa.jpg",
    hindiCaption: "उम्मीदों और नए कदमों का कारवां 🚀",
    englishCaption: "A vanguard of hope, bold steps, and sharing incredible visions of future conquest.",
    timePeriod: "The Visionary Paths",
    bgGlow: "from-rose-500/20 to-red-500/10"
  },
  {
    id: "mem6",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468023662-6281e8f6-6640-47aa-b8ca-71c96ce747fd.jpg",
    hindiCaption: "नक्षत्रों सा चमकता हमारा अटूट याराना ⭐",
    englishCaption: "A bond as permanent and shimmering as the constellations in the cosmic vault.",
    timePeriod: "Cosmic Bond",
    bgGlow: "from-sky-500/20 to-indigo-500/10"
  },
  {
    id: "mem7",
    imageUrl: "https://www.image2url.com/r2/default/images/1779468579100-6dd3fe63-8ddf-43bb-8451-b29957e3ea1b.jpg",
    hindiCaption: "30वे सौर चक्र की महान शुरुआत 👑",
    englishCaption: "Starting the momentous 30th solar orbit with dignity, class, and absolute power.",
    timePeriod: "Ankit's Chapter 30",
    bgGlow: "from-violet-500/20 to-fuchsia-500/10"
  }
];

export const OFFLINE_PANCHANG: PanchangInfo = {
  name: "Ankit Singh",
  dob: "1996-05-23",
  rashi: "कर्क (Cancer - Shield and Intuition)",
  nakshatra: "पुष्य (Pushya) - The Monarch of Star Systems",
  tithi: "षष्ठी / सप्तमी (Shukla Paksha - Waxing Phase)",
  yoga: "हर्षण (Harshana - Giver of Joy and Vibrance)",
  karan: "तैतिल (Taitila) & गर (Gara)",
  rashiLord: "चंद्र देव (Chandra देव - Moon)",
  element: "जल (Water Element - Giver of Adapting Strength)",
  luckyColor: "मोती जैसा सफेद, चांदी (Pearl White, Silver, Cream)",
  luckyNumber: "2 और 7",
  mantra: "ॐ चन्द्राय नमः | ॐ पुष्याय नमः(Om Chandraya Namah | Om Pushyaya Namah)",
  traits: [
    {
      title: "गहन अंतर्ज्ञान (Deep Intuition)",
      desc: "Ankit has an astounding innate sense of intuition. He reads emotional undercurrents effortlessly and possesses a natural compass that senses changes before they happen."
    },
    {
      title: "अटूट निष्ठा (Resolute Loyalty)",
      desc: "Like the cosmic ocean, his loyalty runs deep. He stands shield-first for his friends and loved ones, proving to be the most dependable ally one could ever have."
    },
    {
      title: "पुष्य की पोषण शक्ति (The Pushya Force)",
      desc: "Born under the king of nakshatras, Pushya, Ankit is driven by benevolence, generosity, and an organic urge to support, heal, and bring out the best in humanity."
    },
    {
      title: "रचनात्मक कौशल (Creative Visionary)",
      desc: "Under Chandra's soft illumination, his mind is highly imaginative, creating strategic masterstrokes and harboring an appreciation for depth and fine arts."
    },
    {
      title: "शांत विलासिता और शौर्य (Dignified Sovereignty)",
      desc: "Possesses a composed demeanor, but stores deep determination and absolute poise. He leads quietly but gets things done with unwavering gravity."
    }
  ]
};
