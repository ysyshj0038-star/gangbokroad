import type { LocalizedText } from '@/types';

export type PracticalSection = {
  id: string;
  icon: string;
  title: LocalizedText;
  items: LocalizedText[];
};

export const practicalSections: PracticalSection[] = [
  {
    id: 'emergency',
    icon: 'call-outline',
    title: { ko: '긴급연락망', en: 'Emergency Contacts' },
    items: [
      {
        ko: '주중 대한민국 대사관: +86-10-8531-0700 (24시간)',
        en: 'Korean Embassy in China: +86-10-8531-0700 (24h)',
      },
      {
        ko: '주블라디보스톡 총영사관: +7-423-249-7117 (24시간)',
        en: 'Korean Consulate in Vladivostok: +7-423-249-7117 (24h)',
      },
      {
        ko: '현지 긴급: 중국 110 (경찰) / 120 (응급) · 러시아 112',
        en: 'Local emergency: China 110 (police) / 120 (medical) · Russia 112',
      },
    ],
  },
  {
    id: 'exchange',
    icon: 'cash-outline',
    title: { ko: '환전', en: 'Currency Exchange' },
    items: [
      {
        ko: '중국: 위안(CNY) — 공항·은행·환전소 이용, 알리페이/위챗페이 준비 권장',
        en: 'China: Yuan (CNY) — exchange at airports, banks; Alipay/WeChat Pay recommended',
      },
      {
        ko: '러시아: 루블(RUB) — 공항 환전, 카드 사용 가능하나 현금 병행 권장',
        en: 'Russia: Ruble (RUB) — airport exchange; cards accepted but carry cash too',
      },
      {
        ko: '원화 환전은 출발 전 국내에서 미리 준비하세요',
        en: 'Prepare KRW exchange before departure in Korea',
      },
    ],
  },
  {
    id: 'clothing',
    icon: 'shirt-outline',
    title: { ko: '복장 및 기후', en: 'Clothing & Climate' },
    items: [
      {
        ko: '8월 만주·연해주: 낮 25~30°C, 밤 15~20°C — 얇은 겉옷 필수',
        en: 'August Manchuria/Primorye: 25–30°C day, 15–20°C night — bring a light jacket',
      },
      {
        ko: '장시간 야외 탐방 — 편한 walking shoes, 모자, 자외선 차단제',
        en: 'Long outdoor tours — comfortable walking shoes, hat, sunscreen',
      },
      {
        ko: '교회·기념관 방문 시 단정한 복장 권장',
        en: 'Modest attire recommended for memorials and cultural sites',
      },
    ],
  },
  {
    id: 'checklist',
    icon: 'checkbox-outline',
    title: { ko: '체크리스트', en: 'Travel Checklist' },
    items: [
      { ko: '여권 (유효기간 6개월 이상)', en: 'Passport (6+ months validity)' },
      { ko: '중국·러시아 비자', en: 'China & Russia visas' },
      { ko: '여행자 보험', en: 'Travel insurance' },
      { ko: '국제운전면허증 (필요 시)', en: 'International driving permit (if needed)' },
      { ko: '상비약 · 개인 의약품', en: 'First-aid kit & personal medications' },
      { ko: '여분 배터리 · 멀티탭 · 변환 플러그', en: 'Power bank, multi-plug, adapter' },
      { ko: 'VPN (중국 인터넷 이용 시)', en: 'VPN (for internet in China)' },
      { ko: '현지 SIM 또는 eSIM', en: 'Local SIM or eSIM' },
    ],
  },
];
