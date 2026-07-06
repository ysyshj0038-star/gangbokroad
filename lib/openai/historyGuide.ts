import { getCurrentLanguage } from '@/i18n';

import { createChatCompletion } from './client';

const SYSTEM_PROMPT_KO = `당신은 만주·연해주 독립운동 역사 전문 AI 해설사입니다.
교육감, 교수, 교사들이 현장 탐방 중 사용합니다.
정확하고 감동적인 역사 해설을 제공하되, 추측은 하지 마세요.
모르는 내용은 "확인이 필요합니다"라고 답하세요.
답변은 명확한 문단으로 구성하고, 교육 현장에서 활용하기 좋게 작성하세요.`;

const SYSTEM_PROMPT_EN = `You are an AI history guide specializing in the Korean independence movement in Manchuria and Primorye.
Your audience includes superintendents, professors, and teachers on a field tour.
Provide accurate, moving historical explanations. Do not speculate.
If uncertain, say verification is needed.
Write in clear paragraphs suitable for educational use.`;

export async function askHistoryGuide(params: {
  question: string;
  context?: string;
  language?: 'ko' | 'en';
}): Promise<string> {
  const lang = params.language ?? getCurrentLanguage();
  const systemPrompt = lang === 'ko' ? SYSTEM_PROMPT_KO : SYSTEM_PROMPT_EN;

  const userContent = params.context
    ? `[탐방 맥락]\n${params.context}\n\n[질문]\n${params.question}`
    : params.question;

  return createChatCompletion({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    temperature: 0.7,
    maxTokens: 1500,
  });
}

export async function generatePlaceNarration(params: {
  placeName: string;
  description: string;
  historicalStory: string;
  relatedFigures: string[];
  language?: 'ko' | 'en';
}): Promise<string> {
  const lang = params.language ?? getCurrentLanguage();
  const isKo = lang === 'ko';

  const prompt = isKo
    ? `다음 장소에 대한 3~5분 분량(약 900~1200자)의 AI 역사 해설 대본을 작성하세요.
자연스럽게 읽히는 구어체로, 현장에서 듣는 해설처럼 작성하세요.

장소: ${params.placeName}
설명: ${params.description}
역사: ${params.historicalStory}
관련 독립운동가: ${params.relatedFigures.join(', ') || '없음'}

다음 순서로 설명하세요:
1. 장소 소개
2. 역사적 배경
3. 이곳에서 있었던 주요 사건
4. 관련 독립운동가 소개
5. 역사적 의미
6. 오늘날 우리가 기억해야 하는 이유
7. 교육적 시사점

마지막 문장은 반드시 다음으로 끝내세요:
"다음 장소에서도 독립운동의 발자취를 함께 따라가 보겠습니다."

제목, 번호, 마크다운 없이 해설 원고만 출력하세요.`
    : `Write a 3–5 minute (900–1200 characters) AI history narration script for this site.
Use a natural spoken tone as if guiding visitors on site.

Place: ${params.placeName}
Description: ${params.description}
History: ${params.historicalStory}
Related figures: ${params.relatedFigures.join(', ') || 'None'}

Cover in order:
1. Place introduction
2. Historical background
3. Major events here
4. Related independence leaders
5. Historical significance
6. Why we should remember today
7. Educational implications

End with: "Let us continue following the footsteps of the independence movement at the next site."

Output only the narration script, no titles or markdown.`;

  return createChatCompletion({
    messages: [
      {
        role: 'system',
        content: isKo ? SYSTEM_PROMPT_KO : SYSTEM_PROMPT_EN,
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.75,
    maxTokens: 2500,
  });
}
