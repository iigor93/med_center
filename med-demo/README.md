# МедСервис Demo

Демо-PWA медицинского центра на `React + Vite`.

Реализовано:

- главная страница в формате пациентского дашборда
- страница центров с демо-картой и выбором филиала
- страница врачей с поиском и фильтром по специальности
- страница записи с двумя режимами: к врачу и по направлению
- личный кабинет с историей посещений и анализами
- страницы `success`, `error` и `404`
- PWA-манифест и service worker для кэширования статики

## Запуск

```bash
npm install
npm run dev
```

Локальный dev-сервер Vite обычно поднимается на `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Особенности демо

- используется `HashRouter`, чтобы приложение корректно открывалось как статическая сборка
- данные центров, врачей, анализов и слотов лежат в [src/mockData.js](/d:/vscode/personal/med_center/med-demo/src/mockData.js)
- после отправки формы запись сохраняется только в `localStorage`
- PDF-заглушка лежит в [public/demo-result.pdf](/d:/vscode/personal/med_center/med-demo/public/demo-result.pdf)
