import type { Figure } from '@/types/figure';

export const figures: Figure[] = [
  {
    id: 'an-huije',
    name: { ko: '안희제', en: 'An Huije' },
    birthDeath: '1872–1938',
    biography: {
      ko: '만주 지역에서 독립운동과 교육 활동을 펼친 독립운동가입니다. 일본의 식민 통치 속에서 조선족 청년들을 교육하고, 발해진 조선족소학교와 발해농장을 통해 민족의 교육·경제적 자립을 추구했습니다.',
      en: 'An independence activist who led educational and patriotic activities in Manchuria. He educated Korean youth and pursued ethnic self-reliance through Balhaejin School and Balhae Farm.',
    },
    achievements: [
      { ko: '발해진 조선족소학교 설립', en: 'Founded Balhaejin Korean ethnic elementary school' },
      { ko: '발해농장 운영을 통한 민족 경제 기반 마련', en: 'Built economic foundations through Balhae Farm' },
      { ko: '만주 지역 독립운동·교육 네트워크 구축', en: 'Built independence and education networks in Manchuria' },
    ],
    quote: {
      ko: '교육이 곧 독립의 길이다.',
      en: 'Education is the path to independence.',
    },
    relatedPlaceIds: ['an-huije-house', 'balhaejin-school', 'balhae-farm'],
    referenceUrls: ['https://www.much.go.kr'],
  },
  {
    id: 'lee-sangseol',
    name: { ko: '이상설', en: 'Lee Sang-seol' },
    birthDeath: '1870–1917',
    biography: {
      ko: '서간도 지역에서 항일·교육 활동을 전개한 독립운동가이자 교육자입니다. 의병 활동과 함께 서간도 지역의 교육·계몽 운동을 이끌며 민족의 정기를 지켰습니다.',
      en: 'An independence activist and educator in West Jiandao who led resistance and enlightenment movements.',
    },
    achievements: [
      { ko: '서간도 지역 교육·계몽 운동 전개', en: 'Led educational enlightenment in West Jiandao' },
      { ko: '항일 의병 활동 참여', en: 'Participated in anti-Japanese righteous army activities' },
    ],
    quote: {
      ko: '민족의 정기를 지키는 것이 우리의 사명이다.',
      en: 'Preserving the spirit of our nation is our mission.',
    },
    relatedPlaceIds: ['lee-sangseol-memorial'],
  },
  {
    id: 'choi-jaehyung',
    name: { ko: '최재형', en: 'Choi Jae-hyeong' },
    birthDeath: '1860–1928',
    biography: {
      ko: '만주·연해주 지역에서 독립운동과 교육·농업 활동을 이끈 인물입니다. 육성촌 농민학교를 설립하고, 고려인(조선족) 공동체의 교육·문화·농업 기반을 마련했습니다.',
      en: 'A leader of independence, education, and agriculture in Manchuria and Primorye, founding Yukseongchon Farmers School.',
    },
    achievements: [
      { ko: '육성촌 농민학교 설립', en: 'Founded Yukseongchon Farmers School' },
      { ko: '고려인 문화·교육 기반 조성', en: 'Built foundations for Koryo-in culture and education' },
      { ko: '농업·실학 교육을 통한 민족 자립 운동', en: 'Ethnic self-reliance through agricultural and practical education' },
    ],
    quote: {
      ko: '농업과 교육으로 민족의 미래를 세운다.',
      en: 'We build the future of our nation through agriculture and education.',
    },
    relatedPlaceIds: ['choi-jaehyung-museum', 'choi-jaehyung-monument', 'yukseongchon', 'koryo-culture-center'],
  },
  {
    id: 'jo-myeonghui',
    name: { ko: '조명희', en: 'Jo Myeong-hui' },
    birthDeath: '1890–1942',
    biography: {
      ko: '블라디보스토크를 중심으로 문학과 민족 정신을 일깨운 작가·독립운동가입니다. 『혈의 누』 등 저술을 통해 식민지 현실과 민족의 아픔을 기록했습니다.',
      en: 'A writer and independence activist in Vladivostok who awakened national spirit through literature including "Tears of Blood".',
    },
    achievements: [
      { ko: '『혈의 누』 등 저술을 통한 민족 의식 고취', en: 'Raised national consciousness through "Tears of Blood" and other works' },
      { ko: '블라디보스토크 한인 문학 운동 주도', en: 'Led Korean literary movement in Vladivostok' },
    ],
    quote: {
      ko: '글은 민족의 혈이요, 역사의 증언이다.',
      en: 'Writing is the blood of our nation and testimony of history.',
    },
    relatedPlaceIds: ['jo-myeonghui-literary'],
  },
];

export function getFigure(figureId: string) {
  return figures.find((figure) => figure.id === figureId);
}
