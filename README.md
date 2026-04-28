---
include_toc: true
gitea: none
---

[![repo](https://img.shields.io/badge/repo-golod--app-2ea44f)](https://github.com/evgn-k/golod-app)
![kind](https://img.shields.io/badge/kind-site-0a7ea4)
![compose](https://img.shields.io/badge/compose-no-1f6feb)
![agents](https://img.shields.io/badge/agents-yes-ff9800)
![license](https://img.shields.io/badge/license-MIT-4caf50)
![managed_by](https://img.shields.io/badge/managed%20by-Git-4caf50)

# Счетчик голодания

PWA-приложение для отслеживания голодовки с живым таймером, кольцом прогресса, настройкой периода, темой, мотивационными фразами, историей и локальными уведомлениями.

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Собранное приложение попадает в `dist/`. Это и есть артефакт для публикации.

## Структура

- `index.html` — исходная HTML-точка входа для Vite
- `src/app.js` — основная логика приложения и UI
- `src/motivation.js` — встроенные мотивационные фразы
- `src/styles.css` — вся визуальная часть на нативном CSS
- `public/manifest.json` — PWA manifest
- `public/service-worker.js` — service worker
- `dist/` — результат `npm run build`

## Как работает приложение

- Период голодовки по умолчанию задан константами в `src/app.js`.
- Пользователь может поменять старт и финиш через настройки, значения сохраняются в `localStorage`.
- Там же сохраняются тема, собственные фразы, история и состояние уведомлений.
- Время всегда берётся из локальных часов браузера.

## PWA и деплой

- `vite.config.js` использует `base: "./"`, поэтому собранное приложение корректно работает в подпапке.
- `index.html` в корне репозитория — это исходник, а не копия из `dist/`.
- `manifest.json`, `service-worker.js`, `favicon.svg` и `icon.svg` в `public/` копируются в корень `dist/` при сборке.
- При изменении стратегии кэширования нужно повышать `CACHE_NAME` в service worker.

## Стек

- HTML
- JavaScript ES modules
- нативный CSS
- Vite
- PWA manifest + service worker

Примечание: в `package.json` и конфигурации ещё лежат Tailwind/PostCSS и `chart.js`, но текущий интерфейс их не использует.

## Проверка после изменений

1. Выполнить `npm run build`.
2. Проверить, что в `dist/` есть `index.html`, `manifest.json`, `service-worker.js`, `favicon.svg`, `icon.svg` и актуальные файлы в `dist/assets/`.
3. Если менялся UI или поведение PWA, открыть приложение в браузере и проверить консоль, установку манифеста и обновление service worker.

## Лицензия

MIT
