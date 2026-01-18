# Portfolio

Бул менин жеке портфолио сайтым.

## Технологиялар
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- Firebase Firestore (маалыматтарды cloud'да сакташ үчүн)

## Орнотуу

```bash
git clone https://github.com/uma1kulow/portfolio.git
cd portfolio
npm install
npm run dev
```

## Firebase Firestore орнотуу (маалыматтарды бардык куралдарда сакташ үчүн)

Админ панелдеги өзгөртүүлөр бардык куралдарда (десктоп, телефон, ж.б.) калыптырылуу үчүн Firebase Firestore керек:

1. **Firebase проект түзүү:**
   - https://console.firebase.google.com/ сайтына кирип, жаңы проект түзүңүз
   - Проекттин атын киргизип, "Continue" басыңыз

2. **Firestore Database орнотуу:**
   - Firebase Console'до "Firestore Database" басыңыз
   - "Create database" басып, "Start in test mode" тандаңыз (келерде security rules кошусаңыз болот)
   - Location тандап, "Enable" басыңыз

3. **Firebase конфигурация ачкычтарын алуу:**
   - Firebase Console'до "Project Settings" (⚙️) басыңыз
   - "General" табында "Your apps" бөлүмүнө түшүңүз
   - Web app (</>) иконкасын басып, атын киргизип, "Register app" басыңыз
   - Config маалыматтарын көчүрүп алыңыз

4. **Environment файл түзүү:**
   - `ilyaz-s-portfolio-showcase` папкасында `.env` файл түзүңүз
   - Төмөнкү маалыматтарды киргизиңиз:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. **Firebase орнотуу:**
   ```bash
   npm install
   ```

6. **Сайтты иштетүү:**
   ```bash
   npm run dev
   ```

**Эскертүү:** Эгерде Firebase орнотулбаса, система localStorage колдонот (бир браузерге гана иштейт). Firebase орноткондон кийин маалыматтар бардык куралдарда синхрондашат.

## Админ панел

Админ панелге кирүү үчүн футердеги "Журнал" баскычын басыңыз.

**Логин:** `uma1kulov`
**Пароль:** `ilyazaz`
