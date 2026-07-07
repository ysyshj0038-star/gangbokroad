# 광복81주년 역사탐방

광복 81주년 만주·연해주 독립운동 역사탐방을 위한 Expo React Native 앱입니다. 일정, 지도, 독립운동가 자료, AI 역사해설, AI 통역, 자료실, 관리자 기능을 제공합니다.

## 기술 스택

- Expo SDK 57
- React Native 0.86
- Expo Router
- TypeScript
- NativeWind
- Firebase Authentication, Firestore, Storage
- Expo Maps, Expo Location, Expo Notifications
- OpenAI API
- i18next 한국어/영어 지원

## 로컬 실행

```sh
npm install
npm run typecheck
npm start -- --clear
```

Expo Maps는 Expo Go에서 사용할 수 없으므로 지도 기능은 development build에서 확인해야 합니다.

## 웹 빌드

```sh
npm run build:web
```

Expo 웹 정적 빌드는 `dist` 폴더에 생성됩니다. Vercel은 `vercel.json` 설정에 따라 이 폴더를 배포합니다.

## 환경변수

`.env.example`을 기준으로 `.env`를 만들고 다음 값을 채웁니다.

```sh
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_OPENAI_API_KEY=
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=
EAS_PROJECT_ID=
```

Google Maps를 사용하려면 Google Cloud Console에서 Maps JavaScript API와 Maps SDK for Android를 활성화하세요. 웹 배포용 키는 Vercel 도메인으로 HTTP referrer 제한을 걸고, Android용 키는 앱 패키지 `com.gwangbok.road`와 빌드 인증서 SHA-1로 제한하는 것을 권장합니다.

## Firebase 준비

1. Firebase Console에서 Web 앱을 만들고 `.env`의 Firebase 값을 채웁니다.
2. Authentication에서 이메일/비밀번호 로그인을 활성화합니다.
3. Firestore Database와 Storage를 생성합니다.
4. 규칙을 배포합니다.

```sh
npm run deploy:firebase
```

관리자 권한은 Firestore `users/{uid}` 문서의 `role` 값을 `admin`으로 설정해야 사용할 수 있습니다.

## EAS 빌드

```sh
npx eas login
npm run eas:init
npx eas env:create
npm run eas:build:preview:android
```

preview 빌드는 Android APK 내부 테스트용입니다. production 배포 전에는 `EAS_PROJECT_ID`, Firebase, OpenAI, Google Maps 키를 EAS 환경변수에 등록하세요.

## GitHub 배포 준비

1. GitHub에서 새 저장소를 만듭니다.
2. 로컬 프로젝트를 저장소에 연결하고 push합니다.

```sh
git init
git add .
git commit -m "Initial deploy setup"
git branch -M main
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main
```

GitHub Actions는 push와 pull request에서 `npm ci`, `npm run typecheck`, `npm run build:web`를 실행합니다.

## Vercel 배포

Vercel 프로젝트를 GitHub 저장소와 연결한 뒤 다음 값을 Vercel Environment Variables에 등록합니다.

```sh
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
EXPO_PUBLIC_OPENAI_API_KEY
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
EAS_PROJECT_ID
```

Vercel 설정은 이미 `vercel.json`에 들어 있습니다.

- Framework Preset: Other
- Build Command: `npm run build:web`
- Output Directory: `dist`

GitHub Actions에서 Vercel 자동 배포까지 사용하려면 GitHub 저장소 Secrets에 다음 값을 추가합니다.

```sh
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

이 값이 없으면 Vercel 배포 워크플로는 실패하지 않고 배포만 건너뜁니다.

## 출시 전 체크리스트

- `npm run typecheck` 통과
- Firebase Auth, Firestore, Storage 값 입력
- OpenAI API 키 입력 및 AI 해설/통역 동작 확인
- Google Maps JavaScript API 키와 Vercel 도메인 제한 확인
- Android Google Maps API 키와 SHA-1 제한 확인
- 실제 기기에서 위치 권한, 지도, 푸시 토큰 등록 확인
- 관리자 계정 `role: admin` 설정
- 자료 업로드 후 자료실 다운로드 링크 확인
- GitHub Actions CI 통과
- Vercel Environment Variables 입력
- preview APK 설치 테스트 후 production build 실행
