# Firebase Орнотуу Инструкциясы

Бул файл Firebase орнотууну кантип кылууну көрсөтөт. Firebase орноткондон кийин, админ панелдеги өзгөртүүлөр бардык куралдарда (телефон, ноутбук) синхрондашат.

## 1. Firebase Проект Түзүү

1. https://console.firebase.google.com/ сайтына кириңиз
2. "Add project" басыңыз
3. Проекттин атын киргизиңиз (мисалы: "portfolio")
4. "Continue" басып, кадамдарды бүтүрүңүз

## 2. Firestore Database Орнотуу

1. Firebase Console'до сол менюдөн **"Firestore Database"** басыңыз
2. **"Create database"** басыңыз
3. **"Start in test mode"** тандаңыз (келерде security rules кошусаңыз болот)
4. Location тандап (мисалы: `us-central`), **"Enable"** басыңыз

## 3. Firebase Конфигурация Маалыматтарын Алуу

1. Firebase Console'до сол менюдөн **"Project Settings"** (⚙️ иконкасы) басыңыз
2. **"General"** табын ачыңыз
3. Төмөндө **"Your apps"** бөлүмүн табыңыз
4. Web app (</> иконкасы) басыңыз
5. App nickname киргизиңиз (мисалы: "portfolio-web")
6. **"Register app"** басыңыз
7. Конфигурация маалыматтарын көчүрүп алыңыз (төмөнкү сыяктуу):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## 4. .env Файл Түзүү

1. `ilyaz-s-portfolio-showcase` папкасында `.env` файл түзүңүз
2. Төмөнкү маалыматтарды киргизиңиз (Firebase конфигурация маалыматтарынан көчүрүп):

```
VITE_FIREBASE_API_KEY=AIza... (apiKey мааниси)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com (authDomain мааниси)
VITE_FIREBASE_PROJECT_ID=your-project-id (projectId мааниси)
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com (storageBucket мааниси)
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789 (messagingSenderId мааниси)
VITE_FIREBASE_APP_ID=1:123456789:web:abc123 (appId мааниси)
```

**Эскертүү:** Квадрат кашалар жок, тек маанилерди киргизиңиз!

## 5. Сайтты Кайра Иштетүү

`.env` файлды түзгөндөн кийин, сайтты кайра иштетиңиз:

```bash
npm run dev
```

## Текшерүү

Админ панелге киргенде (футердеги "Журнал" баскычы), Firebase статусу көрсөтүлөт:
- ✅ **Жашыл алерт** - Firebase иштейт, маалыматтар cloud'да сакталат
- ⚠️ **Сары алерт** - Firebase орнотулган жок, localStorage колдонулат

## Көмөк

Эгерде кыйналып жатсаңыз:
1. Browser console'ду ачыңыз (F12)
2. Firebase жөнүндөгү каталарды текшериңиз
3. `.env` файлда бардык маалыматтарды туура киргизгениңизди текшериңиз

