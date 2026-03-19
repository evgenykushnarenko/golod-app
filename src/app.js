import { motivationQuotes } from './motivation.js';

// Default times (used if no saved settings)
const DEFAULT_START_TIME = new Date(2026, 2, 10, 22, 0, 0).getTime();
const DEFAULT_END_TIME = new Date(2026, 2, 31, 22, 0, 0).getTime();

// Load from localStorage or use defaults
function loadSettings() {
  const saved = localStorage.getItem('fastingSettings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        startTime: parsed.startTime,
        endTime: parsed.endTime
      };
    } catch (e) {
      console.error('Failed to parse saved settings:', e);
    }
  }
  return {
    startTime: DEFAULT_START_TIME,
    endTime: DEFAULT_END_TIME
  };
}

// Save settings to localStorage
function saveSettings(startTime, endTime) {
  localStorage.setItem('fastingSettings', JSON.stringify({
    startTime,
    endTime
  }));
}

const settings = loadSettings();
const START_TIME = settings.startTime;
const END_TIME = settings.endTime;
const TOTAL_DURATION = Math.max(END_TIME - START_TIME, 1);
const LOCALE = 'ru-RU';

const DATE_FORMATTER = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

const NOW_FORMATTER = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const refs = {
  currentTime: document.getElementById('currentTime'),
  fastingStatus: document.getElementById('fastingStatus'),
  rangeLabel: document.getElementById('rangeLabel'),
  progressRing: document.getElementById('progressRing'),
  progressPercent: document.getElementById('progressPercent'),
  progressLabel: document.getElementById('progressLabel'),
  progressTitle: document.getElementById('progressTitle'),
  progressSummary: document.getElementById('progressSummary'),
  countdownTitle: document.getElementById('countdownTitle'),
  durationLabel: document.getElementById('durationLabel'),
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  startTimeLabel: document.getElementById('startTimeLabel'),
  endTimeLabel: document.getElementById('endTimeLabel'),
  elapsedValue: document.getElementById('elapsedValue'),
  remainingValue: document.getElementById('remainingValue'),
  quoteText: document.getElementById('quoteText'),
  quoteAuthor: document.getElementById('quoteAuthor'),
  nextQuoteButton: document.getElementById('nextQuoteButton'),
  toggleSettingsButton: document.getElementById('toggleSettingsButton'),
  settingsForm: document.getElementById('settingsForm'),
  saveSettingsButton: document.getElementById('saveSettingsButton'),
  startDateInput: document.getElementById('startDate'),
  endDateInput: document.getElementById('endDate'),
  settingsInfo: document.getElementById('settingsInfo'),
  themeToggle: document.getElementById('themeToggle')
};

let currentQuoteIndex = -1;

function formatClockParts(ms) {
  const safeMs = Math.max(ms, 0);
  const days = Math.floor(safeMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((safeMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((safeMs % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  };
}

function formatDurationLabel(ms) {
  if (ms <= 0) {
    return '0 мин';
  }

  const totalMinutes = Math.floor(ms / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  const parts = [];

  if (days > 0) {
    parts.push(`${days} д`);
  }
  if (hours > 0) {
    parts.push(`${hours} ч`);
  }
  if (minutes > 0 && days === 0) {
    parts.push(`${minutes} мин`);
  }

  return parts.slice(0, 2).join(' ');
}

function getState(now) {
  if (now < START_TIME) {
    return {
      phase: 'upcoming',
      label: 'До старта',
      status: 'Подготовка',
      progress: 0,
      timeLeft: START_TIME - now,
      elapsed: 0,
      remaining: TOTAL_DURATION
    };
  }

  if (now >= END_TIME) {
    return {
      phase: 'completed',
      label: 'Голодовка завершена',
      status: 'Финиш',
      progress: 100,
      timeLeft: 0,
      elapsed: TOTAL_DURATION,
      remaining: 0
    };
  }

  const elapsed = now - START_TIME;
  const remaining = END_TIME - now;

  return {
    phase: 'active',
    label: 'До завершения',
    status: 'В процессе',
    progress: (elapsed / TOTAL_DURATION) * 100,
    timeLeft: remaining,
    elapsed,
    remaining
  };
}

function updateProgress(state) {
  const progressValue = Math.round(state.progress);

  refs.progressRing.style.setProperty('--progress', `${state.progress.toFixed(2)}%`);
  refs.progressPercent.textContent = `${progressValue}%`;
  refs.progressLabel.textContent = state.phase === 'completed' ? 'завершено' : 'пройдено';
  refs.progressTitle.textContent =
    state.phase === 'upcoming' ? 'Подготовка к старту' : 'Путь до завершения';

  if (state.phase === 'upcoming') {
    refs.progressSummary.textContent =
      'Отсчет уже запущен: сейчас экран ждёт стартового момента и держит весь план периода перед глазами.';
    return;
  }

  if (state.phase === 'completed') {
    refs.progressSummary.textContent =
      'Цель достигнута. Кольцо закрыто полностью, таймер остановлен на финальной точке.';
    return;
  }

  refs.progressSummary.textContent =
    `Пройдено ${progressValue}% пути. Внутри периода уже прошло ${formatDurationLabel(state.elapsed)}.`;
}

function updateCountdown(state, now) {
  const parts = formatClockParts(state.timeLeft);

  refs.days.textContent = parts.days;
  refs.hours.textContent = parts.hours;
  refs.minutes.textContent = parts.minutes;
  refs.seconds.textContent = parts.seconds;

  refs.currentTime.textContent = `Сейчас: ${NOW_FORMATTER.format(now)}`;
  refs.countdownTitle.textContent = state.label;
  refs.fastingStatus.textContent = state.status;
  refs.fastingStatus.dataset.phase = state.phase;
  refs.elapsedValue.textContent = formatDurationLabel(state.elapsed);
  refs.remainingValue.textContent =
    state.phase === 'upcoming'
      ? formatDurationLabel(START_TIME - now)
      : formatDurationLabel(state.remaining);
}

function updateStaticLabels() {
  refs.rangeLabel.textContent = `${DATE_FORMATTER.format(START_TIME)} - ${DATE_FORMATTER.format(END_TIME)}`;
  refs.startTimeLabel.textContent = DATE_FORMATTER.format(START_TIME);
  refs.endTimeLabel.textContent = DATE_FORMATTER.format(END_TIME);
  refs.durationLabel.textContent = `Длительность периода: ${formatDurationLabel(TOTAL_DURATION)}`;
}

function updateUI() {
  const now = Date.now();
  const state = getState(now);

  updateProgress(state);
  updateCountdown(state, now);
}

function showRandomQuote() {
  if (motivationQuotes.length === 0) {
    refs.quoteText.textContent = 'Добавьте мотивационные фразы в src/motivation.js.';
    refs.quoteAuthor.textContent = '—';
    return;
  }

  let nextIndex = Math.floor(Math.random() * motivationQuotes.length);

  if (motivationQuotes.length > 1) {
    while (nextIndex === currentQuoteIndex) {
      nextIndex = Math.floor(Math.random() * motivationQuotes.length);
    }
  }

  currentQuoteIndex = nextIndex;

  const quote = motivationQuotes[currentQuoteIndex];
  refs.quoteText.textContent = quote.text;
  refs.quoteAuthor.textContent = quote.author ? `— ${quote.author}` : '—';
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    const serviceWorkerUrl = new URL('./service-worker.js', window.location.href);
    await navigator.serviceWorker.register(serviceWorkerUrl);
  } catch (error) {
    console.error('Не удалось зарегистрировать service worker:', error);
  }
}

// Theme toggle functionality
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      refs.themeToggle.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      refs.themeToggle.textContent = '🌙';
    }
  };
  
  // Apply saved theme or system preference
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (!prefersDark) {
    applyTheme('light');
  }
  
  refs.themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
}

function init() {
  initTheme();
  updateStaticLabels();
  updateUI();
  showRandomQuote();
  registerServiceWorker();

  refs.nextQuoteButton.addEventListener('click', showRandomQuote);

  // Settings functionality
  let settingsVisible = false;
  refs.toggleSettingsButton.addEventListener('click', () => {
    settingsVisible = !settingsVisible;
    refs.settingsForm.style.display = settingsVisible ? 'block' : 'none';
    refs.settingsInfo.style.display = settingsVisible ? 'none' : 'block';
    refs.toggleSettingsButton.textContent = settingsVisible ? 'Отмена' : 'Изменить';
    
    if (settingsVisible) {
      // Populate inputs with current values
      refs.startDateInput.value = new Date(START_TIME).toISOString().slice(0, 16);
      refs.endDateInput.value = new Date(END_TIME).toISOString().slice(0, 16);
    }
  });

  refs.saveSettingsButton.addEventListener('click', () => {
    const newStartTime = new Date(refs.startDateInput.value).getTime();
    const newEndTime = new Date(refs.endDateInput.value).getTime();
    
    if (newStartTime >= newEndTime) {
      alert('Дата окончания должна быть позже даты старта!');
      return;
    }
    
    saveSettings(newStartTime, newEndTime);
    location.reload(); // Reload to apply new settings
  });

  window.setInterval(updateUI, 1000);
  window.setInterval(showRandomQuote, 60000);
}

document.addEventListener('DOMContentLoaded', init);
