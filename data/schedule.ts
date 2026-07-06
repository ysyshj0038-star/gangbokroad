import type { ScheduleDay } from '@/types/schedule';

export const scheduleDays: ScheduleDay[] = [
  {
    id: 'day1',
    dayNumber: 1,
    date: '2025-08-11',
    dateLabel: { ko: '8월 11일', en: 'August 11' },
    route: [
      { ko: '인천', en: 'Incheon' },
      { ko: '하얼빈', en: 'Harbin' },
      { ko: '영안', en: 'Yongan' },
      { ko: '쑤이펀허', en: 'Suifenhe' },
    ],
    placeIds: ['an-huije-house', 'balhaejin-school', 'balhae-farm'],
  },
  {
    id: 'day2',
    dayNumber: 2,
    date: '2025-08-12',
    dateLabel: { ko: '8월 12일', en: 'August 12' },
    route: [
      { ko: '쑤이펀허', en: 'Suifenhe' },
      { ko: '포그라니치니', en: 'Pogranichny' },
      { ko: '우수리스크', en: 'Ussuriysk' },
    ],
    placeIds: ['lee-sangseol-memorial', 'choi-jaehyung-museum', 'choi-jaehyung-monument'],
  },
  {
    id: 'day3',
    dayNumber: 3,
    date: '2025-08-13',
    dateLabel: { ko: '8월 13일', en: 'August 13' },
    route: [{ ko: '우수리스크', en: 'Ussuriysk' }],
    placeIds: [
      'balhae-ruins',
      'yukseongchon',
      'koryo-culture-center',
      'korean-congress-site',
      'ussuriysk-museum',
      'koryo-market',
    ],
  },
  {
    id: 'day4',
    dayNumber: 4,
    date: '2025-08-14',
    dateLabel: { ko: '8월 14일', en: 'August 14' },
    route: [
      { ko: '블라디보스토크', en: 'Vladivostok' },
      { ko: '베이징', en: 'Beijing' },
    ],
    placeIds: [
      'sinhanchon-monument',
      'gaecheokri-site',
      'korean-migration-150',
      'jo-myeonghui-literary',
      'eagle-viewpoint',
    ],
  },
  {
    id: 'day5',
    dayNumber: 5,
    date: '2025-08-15',
    dateLabel: { ko: '8월 15일 (광복절)', en: 'August 15 (Liberation Day)' },
    route: [
      { ko: '베이징', en: 'Beijing' },
      { ko: '인천', en: 'Incheon' },
    ],
    placeIds: [],
  },
];

export function getScheduleDay(dayId: string) {
  return scheduleDays.find((day) => day.id === dayId);
}

export function getTourStartDate() {
  return new Date('2025-08-11T00:00:00+09:00');
}

export function getDDayCount(fromDate = new Date()) {
  const start = getTourStartDate();
  const diffMs = start.getTime() - fromDate.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
