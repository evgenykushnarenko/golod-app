---
include_toc: side
lang: ru
gitea: table
---

[![repo](https://s.evgn.ru/badge/repo-golod-app-2ea44f)](https://git.evgn.ru/evgeny/golod-app)
![kind](https://s.evgn.ru/badge/kind-site-0a7ea4)
![compose](https://s.evgn.ru/badge/compose-no-1f6feb)
![agents](https://s.evgn.ru/badge/agents-yes-ff9800)
![license](https://s.evgn.ru/badge/license-MIT-4caf50)
![managed_by](https://s.evgn.ru/badge/managed%20by-Git-4caf50)

# Счетчик голодания

PWA-приложение для отслеживания времени голодовки с живым обратным отсчетом, кольцом прогресса и мотивационными фразами.

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Собранные файлы будут в директории `dist/`.

## Публикация

- `index.html` и статические файлы используют относительные пути, поэтому приложение корректно работает в подпапке GitHub Pages.
- `vite.config.js` использует `base: "./"`, чтобы сборка не генерировала сломанные абсолютные ссылки вида `/assets/...`.
- PWA-файлы лежат и в корне, и в `public/`, чтобы сайт оставался рабочим как при прямой публикации статических файлов, так и после `vite build`.

## Конфигурация

В файле `src/app.js` заданы временные параметры:

```javascript
const START_TIME = new Date(2026, 2, 10, 22, 0, 0).getTime();
const END_TIME = new Date(2026, 2, 31, 22, 0, 0).getTime();
```

Они создаются в локальном времени браузера.

## Стек

- **Frontend**: HTML, CSS, JavaScript (ES modules)
- **UI**: нативный CSS с адаптивной сеткой и conic-gradient
- **PWA**: manifest + service worker
- **Сборка**: Vite

## Лицензия

MIT
