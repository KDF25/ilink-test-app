# iLink | Test App

Небольшое React/Vite‑приложение на TypeScript. Ниже — минимальные инструкции для локального запуска и проверки качества кода.

## Требования

- Node.js 20+ (рекомендуется LTS)
- npm 10+

## Установка зависимостей

```bash
npm install
```

## Режим разработки

```bash
npm run dev
```

Откройте адрес из консоли (по умолчанию http://localhost:5173) и при необходимости активируйте HMR.

## Проверки качества

```bash
npm run format   # форматирование исходников Prettier'ом
npm run lint     # ESLint + плагины проекта
```

## Production-сборка

```bash
npm run build    # tsc --build + format + lint + vite build
npm run preview  # локальный предпросмотр собранного бандла
```

Собранные артефакты появляются в каталоге `dist/`.
