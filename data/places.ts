import type { Place } from '@/types/place';

const navy = '#1B2A4A';
const blue = '#0047A0';
const red = '#CD2E3A';

export const places: Place[] = [
  // Day 1
  {
    id: 'an-huije-house',
    dayId: 'day1',
    order: 1,
    name: { ko: '안희제 선생 옛집', en: 'An Huije Former Residence' },
    description: {
      ko: '안희제 선생이 거주하며 독립운동과 교육 활동을 펼친 옛집입니다.',
      en: 'The former residence where An Huije lived and led independence and educational activities.',
    },
    historicalStory: {
      ko: '1920년대 만주 지역 민족 교육·독립운동의 중심지로 기능했습니다. 이곳에서 안희제 선생은 조선족 청년들을 교육하고, 일본의 식민 통치에 맞서 민족 정신을 지키는 활동을 이어갔습니다.',
      en: 'In the 1920s, this served as a center of ethnic education and independence activities in Manchuria. Here, An Huije educated Korean youth and resisted colonial rule.',
    },
    imageGradient: [navy, blue],
    coordinates: { latitude: 44.412, longitude: 131.152 },
    figureIds: ['an-huije'],
    hasAudioGuide: true,
  },
  {
    id: 'balhaejin-school',
    dayId: 'day1',
    order: 2,
    name: { ko: '발해진 조선족소학교', en: 'Balhaejin Korean Ethnic Elementary School' },
    description: {
      ko: '안희제 선생이 설립한 조선족 소학교 터입니다.',
      en: 'The site of the Korean ethnic elementary school founded by An Huije.',
    },
    historicalStory: {
      ko: '식민지 시대 민족 교육의 상징적 공간입니다. 일본의 동화 교육 정책 속에서도 한글과 민족 역사를 가르치며 독립 의식을 키웠습니다.',
      en: 'A symbolic space of ethnic education during the colonial period, teaching Hangul and national history despite assimilation policies.',
    },
    imageGradient: [blue, navy],
    coordinates: { latitude: 44.415, longitude: 131.148 },
    figureIds: ['an-huije'],
    hasAudioGuide: true,
  },
  {
    id: 'balhae-farm',
    dayId: 'day1',
    order: 3,
    name: { ko: '발해농장', en: 'Balhae Farm' },
    description: {
      ko: '안희제 선생이 운영한 농장으로, 민족 경제 자립의 기반이 되었습니다.',
      en: 'A farm operated by An Huije that became a foundation for ethnic economic independence.',
    },
    historicalStory: {
      ko: '교육과 함께 농업을 통해 민족의 경제적 자립을 추구한 현장입니다. 수확물은 학교 운영과 독립운동 자금으로 사용되었습니다.',
      en: 'A site pursuing economic self-reliance through agriculture alongside education. Harvests supported schools and independence funds.',
    },
    imageGradient: ['#2D5016', '#4A7C23'],
    coordinates: { latitude: 44.418, longitude: 131.145 },
    figureIds: ['an-huije'],
    hasAudioGuide: true,
  },
  // Day 2
  {
    id: 'lee-sangseol-memorial',
    dayId: 'day2',
    order: 1,
    name: { ko: '이상설 선생 유허비', en: 'Lee Sang-seol Memorial Stele' },
    description: {
      ko: '이상설 선생을 기리는 유허비가 있는 곳입니다.',
      en: 'A memorial stele honoring Lee Sang-seol.',
    },
    historicalStory: {
      ko: '서간도 지역 독립·교육 활동의 흔적을 기억하는 공간입니다. 이상설 선생은 항일 의병 활동과 교육·계몽 운동을 통해 민족의 정기를 지켰습니다.',
      en: 'Remembers independence and educational activities in West Jiandao. Lee Sang-seol preserved national spirit through resistance and enlightenment.',
    },
    imageGradient: [navy, red],
    coordinates: { latitude: 43.802, longitude: 131.945 },
    figureIds: ['lee-sangseol'],
    hasAudioGuide: true,
  },
  {
    id: 'choi-jaehyung-museum',
    dayId: 'day2',
    order: 2,
    name: { ko: '최재형 기념관', en: 'Choi Jae-hyeong Memorial Museum' },
    description: {
      ko: '최재형 선생의 생애와 업적을 전시하는 기념관입니다.',
      en: 'A memorial museum exhibiting the life and achievements of Choi Jae-hyeong.',
    },
    historicalStory: {
      ko: '만주·연해주 독립운동과 농업·교육 운동의 역사를 한눈에 볼 수 있습니다. 유물과 사료를 통해 고려인(조선족) 공동체의 독립운동사를 전합니다.',
      en: 'Displays the history of independence, agriculture, and education in Manchuria and Primorye through artifacts and documents.',
    },
    imageGradient: [blue, '#2A3F6B'],
    coordinates: { latitude: 43.801, longitude: 131.952 },
    figureIds: ['choi-jaehyung'],
    hasAudioGuide: true,
  },
  {
    id: 'choi-jaehyung-monument',
    dayId: 'day2',
    order: 3,
    name: { ko: '최재형 기념비', en: 'Choi Jae-hyeong Memorial Monument' },
    description: {
      ko: '최재형 선생의 업적을 기리는 기념비입니다.',
      en: 'A monument honoring the achievements of Choi Jae-hyeong.',
    },
    historicalStory: {
      ko: '육성촌 운동과 농민학교 설립 등 최재형 선생의 독립운동·교육·농업 활동을 기념합니다.',
      en: 'Commemorates Choi Jae-hyeong\'s independence, education, and agricultural work including Yukseongchon and the farmers school.',
    },
    imageGradient: [red, navy],
    coordinates: { latitude: 43.803, longitude: 131.948 },
    figureIds: ['choi-jaehyung'],
    hasAudioGuide: true,
  },
  // Day 3
  {
    id: 'balhae-ruins',
    dayId: 'day3',
    order: 1,
    name: { ko: '발해성터', en: 'Balhae Fortress Ruins' },
    description: {
      ko: '고대 발해와 연결된 역사적 유적지입니다.',
      en: 'A historical site connected to ancient Balhae.',
    },
    historicalStory: {
      ko: '발해의 역사적 기억과 조선족 공동체의 정체성이 교차하는 장소입니다. 만주 땅에서 펼쳐진 한민족의 역사를 되새깁니다.',
      en: 'Where Balhae\'s historical memory intersects with Koryo-in identity on Manchurian soil.',
    },
    imageGradient: ['#5C4033', navy],
    coordinates: { latitude: 43.805, longitude: 131.965 },
    figureIds: [],
    hasAudioGuide: true,
  },
  {
    id: 'yukseongchon',
    dayId: 'day3',
    order: 2,
    name: { ko: '육성촌 농민학교', en: 'Yukseongchon Farmers School' },
    description: {
      ko: '최재형 선생이 설립한 농민학교 터입니다.',
      en: 'The site of the farmers school founded by Choi Jae-hyeong.',
    },
    historicalStory: {
      ko: '교육과 농업을 결합한 민족 운동의 현장입니다. 농민과 청년에게 실학 교육을 제공하며 독립의 기반을 다졌습니다.',
      en: 'A site combining education and agriculture, providing practical education to farmers and youth.',
    },
    imageGradient: ['#2D5016', blue],
    coordinates: { latitude: 43.798, longitude: 131.971 },
    figureIds: ['choi-jaehyung'],
    hasAudioGuide: true,
  },
  {
    id: 'koryo-culture-center',
    dayId: 'day3',
    order: 3,
    name: { ko: '고려인문화센터', en: 'Koryo-in Culture Center' },
    description: {
      ko: '고려인(조선족) 문화와 역사를 보존·전승하는 문화센터입니다.',
      en: 'A center preserving and transmitting Koryo-in culture and history.',
    },
    historicalStory: {
      ko: '우수리스크 지역 고려인 공동체의 문화와 독립운동 역사를 전시합니다.',
      en: 'Exhibits the culture and independence history of the Koryo-in community in Ussuriysk.',
    },
    imageGradient: [blue, red],
    coordinates: { latitude: 43.797, longitude: 131.968 },
    figureIds: ['choi-jaehyung'],
    hasAudioGuide: true,
  },
  {
    id: 'korean-congress-site',
    dayId: 'day3',
    order: 4,
    name: { ko: '전로한족회중앙총회 결성지', en: 'Jeonro Korean Association Founding Site' },
    description: {
      ko: '전로한족회 중앙총회가 결성된 역사적 장소입니다.',
      en: 'The historic site where the Jeonro Korean Association central congress was formed.',
    },
    historicalStory: {
      ko: '만주·연해주 지역 한인(조선족) 공동체가 하나로 뭉쳐 독립운동을 조직했던 상징적 공간입니다.',
      en: 'A symbolic space where Korean communities in Manchuria and Primorye united for independence.',
    },
    imageGradient: [navy, blue],
    coordinates: { latitude: 43.796, longitude: 131.962 },
    figureIds: [],
    hasAudioGuide: true,
  },
  {
    id: 'ussuriysk-museum',
    dayId: 'day3',
    order: 5,
    name: { ko: '우수리스크 박물관', en: 'Ussuriysk Museum' },
    description: {
      ko: '우수리스크 지역의 역사와 문화를 전시하는 박물관입니다.',
      en: 'A museum exhibiting the history and culture of the Ussuriysk region.',
    },
    historicalStory: {
      ko: '연해주 지역의 다문화 역사와 고려인 이주사, 독립운동 관련 자료를 확인할 수 있습니다.',
      en: 'View multicultural history of Primorye, Koryo-in migration, and independence movement materials.',
    },
    imageGradient: ['#4A5568', navy],
    coordinates: { latitude: 43.795, longitude: 131.958 },
    figureIds: [],
    hasAudioGuide: true,
  },
  {
    id: 'koryo-market',
    dayId: 'day3',
    order: 6,
    name: { ko: '고려인시장', en: 'Koryo-in Market' },
    description: {
      ko: '고려인(조선족) 상인들이 운영하는 전통 시장입니다.',
      en: 'A traditional market run by Koryo-in merchants.',
    },
    historicalStory: {
      ko: '100년 넘게 이어온 고려인 공동체의 생활상과 경제 활동을 엿볼 수 있는 곳입니다.',
      en: 'A glimpse into over a century of Koryo-in community life and economic activity.',
    },
    imageGradient: [red, '#D97706'],
    coordinates: { latitude: 43.794, longitude: 131.955 },
    figureIds: [],
    hasAudioGuide: false,
  },
  // Day 4
  {
    id: 'sinhanchon-monument',
    dayId: 'day4',
    order: 1,
    name: { ko: '신한촌 기념비', en: 'Sinhanchon Memorial Monument' },
    description: {
      ko: '블라디보스토크 신한촌(한인 마을)을 기념하는 비석입니다.',
      en: 'A monument commemorating Sinhanchon (Korean village) in Vladivostok.',
    },
    historicalStory: {
      ko: '러시아 연해주에 형성된 한인 공동체의 정체성과 독립운동의 발자취를 기억합니다.',
      en: 'Remembers the identity and independence movement of the Korean community in Russian Primorye.',
    },
    imageGradient: [navy, red],
    coordinates: { latitude: 43.115, longitude: 131.882 },
    figureIds: [],
    hasAudioGuide: true,
  },
  {
    id: 'gaecheokri-site',
    dayId: 'day4',
    order: 2,
    name: { ko: '개척리 터', en: 'Gaecheokri Site' },
    description: {
      ko: '초기 한인 개척자들이 정착했던 개척리 유적지입니다.',
      en: 'The site where early Korean pioneers settled in Gaecheokri.',
    },
    historicalStory: {
      ko: '연해주 개척 시기 한인 이민자들의 삶과 고난, 그리고 독립운동의 씨앗을 되새기는 장소입니다.',
      en: 'Reflects the lives, hardships, and seeds of independence among early Korean immigrants.',
    },
    imageGradient: ['#5C4033', blue],
    coordinates: { latitude: 43.118, longitude: 131.878 },
    figureIds: [],
    hasAudioGuide: true,
  },
  {
    id: 'korean-migration-150',
    dayId: 'day4',
    order: 3,
    name: { ko: '고려인 이주 150주년 기념비', en: '150th Anniversary of Koryo-in Migration' },
    description: {
      ko: '고려인(조선족) 대규모 이주 150주년을 기념하는 monument입니다.',
      en: 'A monument marking 150 years of large-scale Koryo-in migration.',
    },
    historicalStory: {
      ko: '1864년부터 시작된 고려인 이주사와 공동체 형성의 역사를 기념합니다.',
      en: 'Commemorates Koryo-in migration history and community formation since 1864.',
    },
    imageGradient: [blue, navy],
    coordinates: { latitude: 43.120, longitude: 131.880 },
    figureIds: [],
    hasAudioGuide: true,
  },
  {
    id: 'jo-myeonghui-literary',
    dayId: 'day4',
    order: 4,
    name: { ko: '조명희 문학비', en: 'Jo Myeong-hui Literary Monument' },
    description: {
      ko: '조명희 선생을 기리는 문학비가 있는 곳입니다.',
      en: 'A literary monument honoring Jo Myeong-hui.',
    },
    historicalStory: {
      ko: '블라디보스토크에서 펼쳐진 민족 문학의 흔적을 기억합니다. 『혈의 누』 등 저술을 통해 민족의 아픔과 저항을 기록했습니다.',
      en: 'Remembers national literature in Vladivostok. Works like "Tears of Blood" recorded the nation\'s pain and resistance.',
    },
    imageGradient: [red, navy],
    coordinates: { latitude: 43.115, longitude: 131.885 },
    figureIds: ['jo-myeonghui'],
    hasAudioGuide: true,
  },
  {
    id: 'eagle-viewpoint',
    dayId: 'day4',
    order: 5,
    name: { ko: '독수리 전망대', en: 'Eagle Viewpoint' },
    description: {
      ko: '블라디보스토크의 상징적인 전망대입니다.',
      en: 'An iconic viewpoint in Vladivostok.',
    },
    historicalStory: {
      ko: '연해주 지역의 역사와 태평양의 풍경을 함께 바라보며, 독립운동가들이 꿈꿨던 자유와 해방의 의미를 되새깁니다.',
      en: 'View Primorye history and the Pacific together, reflecting on freedom and liberation dreamed by independence activists.',
    },
    imageGradient: [blue, '#0EA5E9'],
    coordinates: { latitude: 43.128, longitude: 131.887 },
    figureIds: [],
    hasAudioGuide: true,
  },
];

export function getPlace(placeId: string) {
  return places.find((place) => place.id === placeId);
}

export function getPlacesByDay(dayId: string) {
  return places
    .filter((place) => place.dayId === dayId)
    .sort((a, b) => a.order - b.order);
}

export function getAllPlaces() {
  return [...places].sort((a, b) => {
    const dayCompare = a.dayId.localeCompare(b.dayId);
    return dayCompare !== 0 ? dayCompare : a.order - b.order;
  });
}
