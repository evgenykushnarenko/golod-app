import { motivationQuotes } from './motivation.js';

// ==================== КОНФИГУРАЦИЯ ====================

const DEFAULT_START_TIME = new Date(2026, 2, 10, 22, 0, 0).getTime();
const DEFAULT_END_TIME = new Date(2026, 2, 31, 22, 0, 0).getTime();
const LOCALE = 'ru-RU';

// ==================== ХРАНИЛИЩЕ ====================

const Storage = {
  KEYS: {
    START_TIME: 'fasting_start_time',
    END_TIME: 'fasting_end_time',
    THEME: 'fasting_theme',
    CUSTOM_QUOTES: 'fasting_custom_quotes',
    HISTORY: 'fasting_history',
    NOTIFICATIONS_ENABLED: 'fasting_notifications',
    MILESTONES_NOTIFIED: 'fasting_milestones'
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  getStartTime() {
    return this.get(this.KEYS.START_TIME, DEFAULT_START_TIME);
  },

  getEndTime() {
    return this.get(this.KEYS.END_TIME, DEFAULT_END_TIME);
  },

  setStartTime(time) {
    this.set(this.KEYS.START_TIME, time);
  },

  setEndTime(time) {
    this.set(this.KEYS.END_TIME, time);
  },

  getTheme() {
    return this.get(this.KEYS.THEME, 'dark');
  },

  setTheme(theme) {
    this.set(this.KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  getCustomQuotes() {
    return this.get(this.KEYS.CUSTOM_QUOTES, []);
  },

  addCustomQuote(quote) {
    const quotes = this.getCustomQuotes();
    quotes.push({ ...quote, id: Date.now(), isCustom: true });
    this.set(this.KEYS.CUSTOM_QUOTES, quotes);
    return quotes;
  },

  deleteCustomQuote(id) {
    const quotes = this.getCustomQuotes().filter(q => q.id !== id);
    this.set(this.KEYS.CUSTOM_QUOTES, quotes);
    return quotes;
  },

  getAllQuotes() {
    return [...motivationQuotes, ...this.getCustomQuotes()];
  },

  getHistory() {
    return this.get(this.KEYS.HISTORY, []);
  },

  addToHistory(entry) {
    const history = this.getHistory();
    history.unshift({ ...entry, id: Date.now() });
    // Ограничиваем историю 50 записями
    if (history.length > 50) history.pop();
    this.set(this.KEYS.HISTORY, history);
  },

  deleteFromHistory(id) {
    const history = this.getHistory().filter(h => h.id !== id);
    this.set(this.KEYS.HISTORY, history);
  },

  areNotificationsEnabled() {
    return this.get(this.KEYS.NOTIFICATIONS_ENABLED, false);
  },

  setNotificationsEnabled(enabled) {
    this.set(this.KEYS.NOTIFICATIONS_ENABLED, enabled);
  },

  getMilestonesNotified() {
    return this.get(this.KEYS.MILESTONES_NOTIFIED, {});
  },

  setMilestoneNotified(percent) {
    const milestones = this.getMilestonesNotified();
    milestones[percent] = true;
    this.set(this.KEYS.MILESTONES_NOTIFIED, milestones);
  },

  resetMilestones() {
    this.set(this.KEYS.MILESTONES_NOTIFIED, {});
  }
};

// ==================== ФОРМАТТЕРЫ ====================

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

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short'
});

// ==================== DOM РЕФЕРЕНСЫ ====================

let refs = {};

function initRefs() {
  refs = {
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
    timerGrid: document.querySelector('.timer-grid')
  };
}

// ==================== УТИЛИТЫ ====================

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
  if (ms <= 0) return '0 мин';

  const totalMinutes = Math.floor(ms / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  const parts = [];

  if (days > 0) parts.push(`${days} д`);
  if (hours > 0) parts.push(`${hours} ч`);
  if (minutes > 0 && days === 0) parts.push(`${minutes} мин`);

  return parts.slice(0, 2).join(' ') || '0 мин';
}

function parseLocalDateTime(datetimeLocal) {
  if (!datetimeLocal) return null;
  const date = new Date(datetimeLocal);
  return isNaN(date.getTime()) ? null : date.getTime();
}

function toDatetimeLocal(timestamp) {
  const date = new Date(timestamp);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

// ==================== СОСТОЯНИЕ ====================

function getState(now) {
  const startTime = Storage.getStartTime();
  const endTime = Storage.getEndTime();
  const totalDuration = Math.max(endTime - startTime, 1);

  if (now < startTime) {
    return {
      phase: 'upcoming',
      label: 'До старта',
      status: 'Подготовка',
      progress: 0,
      timeLeft: startTime - now,
      elapsed: 0,
      remaining: totalDuration,
      startTime,
      endTime,
      totalDuration
    };
  }

  if (now >= endTime) {
    return {
      phase: 'completed',
      label: 'Голодовка завершена',
      status: 'Финиш',
      progress: 100,
      timeLeft: 0,
      elapsed: totalDuration,
      remaining: 0,
      startTime,
      endTime,
      totalDuration
    };
  }

  const elapsed = now - startTime;
  const remaining = endTime - now;

  return {
    phase: 'active',
    label: 'До завершения',
    status: 'В процессе',
    progress: (elapsed / totalDuration) * 100,
    timeLeft: remaining,
    elapsed,
    remaining,
    startTime,
    endTime,
    totalDuration
  };
}

// ==================== ОБНОВЛЕНИЕ UI ====================

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
  } else if (state.phase === 'completed') {
    refs.progressSummary.textContent =
      'Цель достигнута. Кольцо закрыто полностью, таймер остановлен на финальной точке.';
  } else {
    refs.progressSummary.textContent =
      `Пройдено ${progressValue}% пути. Внутри периода уже прошло ${formatDurationLabel(state.elapsed)}.`;
  }
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
      ? formatDurationLabel(state.startTime - now)
      : formatDurationLabel(state.remaining);

  // Обновляем aria-label для скринридеров
  if (refs.timerGrid) {
    const timeText = `${parts.days} дней, ${parts.hours} часов, ${parts.minutes} минут, ${parts.seconds} секунд`;
    refs.timerGrid.setAttribute('aria-label', `Оставшееся время: ${timeText}`);
  }
}

function updateStaticLabels(state) {
  refs.rangeLabel.textContent = `${DATE_FORMATTER.format(state.startTime)} - ${DATE_FORMATTER.format(state.endTime)}`;
  refs.startTimeLabel.textContent = DATE_FORMATTER.format(state.startTime);
  refs.endTimeLabel.textContent = DATE_FORMATTER.format(state.endTime);
  refs.durationLabel.textContent = `Длительность периода: ${formatDurationLabel(state.totalDuration)}`;
}

// ==================== УВЕДОМЛЕНИЯ ====================

async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  
  const permission = await Notification.requestPermission();
  const enabled = permission === 'granted';
  Storage.setNotificationsEnabled(enabled);
  return enabled;
}

async function sendNotification(title, body) {
  if (!Storage.areNotificationsEnabled()) return;
  
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        body,
        icon: './icon.svg',
        badge: './icon.svg',
        tag: 'fasting-reminder'
      });
    });
  }
}

function checkMilestones(state) {
  if (!Storage.areNotificationsEnabled() || state.phase !== 'active') return;

  const milestones = [25, 50, 75, 100];
  const progress = Math.round(state.progress);
  
  for (const milestone of milestones) {
    if (progress >= milestone && !Storage.getMilestonesNotified()[milestone]) {
      Storage.setMilestoneNotified(milestone);
      
      if (milestone === 100) {
        sendNotification('🎉 Поздравляем!', 'Вы успешно завершили голодовку!');
      } else {
        sendNotification('📊 Прогресс голодовки', `Вы прошли ${milestone}% пути! Продолжайте в том же духе!`);
      }
      break;
    }
  }
}

// ==================== МОТИВАЦИОННЫЕ ФРАЗЫ ====================

let currentQuoteIndex = -1;

function showRandomQuote() {
  const quotes = Storage.getAllQuotes();
  
  if (quotes.length === 0) {
    refs.quoteText.textContent = 'Добавьте мотивационные фразы.';
    refs.quoteAuthor.textContent = '—';
    return;
  }

  let nextIndex = Math.floor(Math.random() * quotes.length);

  if (quotes.length > 1) {
    while (nextIndex === currentQuoteIndex) {
      nextIndex = Math.floor(Math.random() * quotes.length);
    }
  }

  currentQuoteIndex = nextIndex;

  const quote = quotes[currentQuoteIndex];
  refs.quoteText.textContent = quote.text;
  refs.quoteAuthor.textContent = quote.author ? `— ${quote.author}` : '—';
}

// ==================== WEB SHARE ====================

async function shareProgress(state) {
  const shareData = {
    title: 'Мой прогресс голодовки',
    text: `Я на ${Math.round(state.progress)}% пути! Осталось ${formatDurationLabel(state.remaining)}.`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
        copyToClipboard(shareData.text);
      }
    }
  } else {
    copyToClipboard(shareData.text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Текст скопирован в буфер обмена');
  }).catch(() => {
    showToast('Не удалось скопировать текст');
  });
}

// ==================== UI КОМПОНЕНТЫ ====================

function showToast(message, duration = 3000) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function createSettingsModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'settingsModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'settingsTitle');
  modal.setAttribute('aria-modal', 'true');

  const startTime = Storage.getStartTime();
  const endTime = Storage.getEndTime();
  const notificationsEnabled = Storage.areNotificationsEnabled();

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="settingsTitle">Настройки голодовки</h2>
        <button class="modal-close" aria-label="Закрыть настройки">&times;</button>
      </div>
      <form id="settingsForm">
        <div class="form-group">
          <label for="startDateTime">Дата и время начала:</label>
          <input type="datetime-local" id="startDateTime" required 
            value="${toDatetimeLocal(startTime)}">
        </div>
        <div class="form-group">
          <label for="endDateTime">Дата и время окончания:</label>
          <input type="datetime-local" id="endDateTime" required 
            value="${toDatetimeLocal(endTime)}">
        </div>
        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" id="enableNotifications" ${notificationsEnabled ? 'checked' : ''}>
            Включить уведомления о прогрессе
          </label>
        </div>
        <div class="form-actions">
          <button type="button" class="secondary-button" id="resetSettings">Сбросить</button>
          <button type="submit" class="primary-button">Сохранить</button>
        </div>
      </form>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
  
  modal.querySelector('#resetSettings').addEventListener('click', () => {
    if (confirm('Сбросить настройки к значениям по умолчанию?')) {
      Storage.setStartTime(DEFAULT_START_TIME);
      Storage.setEndTime(DEFAULT_END_TIME);
      Storage.resetMilestones();
      location.reload();
    }
  });

  modal.querySelector('#settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const startInput = document.getElementById('startDateTime');
    const endInput = document.getElementById('endDateTime');
    const notificationsInput = document.getElementById('enableNotifications');
    
    const newStart = parseLocalDateTime(startInput.value);
    const newEnd = parseLocalDateTime(endInput.value);
    
    if (!newStart || !newEnd) {
      showToast('Пожалуйста, введите корректные даты');
      return;
    }
    
    if (newEnd <= newStart) {
      showToast('Дата окончания должна быть позже даты начала');
      return;
    }

    Storage.setStartTime(newStart);
    Storage.setEndTime(newEnd);
    Storage.resetMilestones();

    if (notificationsInput.checked) {
      await requestNotificationPermission();
    } else {
      Storage.setNotificationsEnabled(false);
    }

    closeModal(modal);
    showToast('Настройки сохранены');
    updateUI();
  });

  return modal;
}

function createQuotesModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'quotesModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'quotesTitle');
  modal.setAttribute('aria-modal', 'true');

  const customQuotes = Storage.getCustomQuotes();
  const quotesList = customQuotes.map(q => `
    <div class="quote-item" data-id="${q.id}">
      <p class="quote-item-text">${escapeHtml(q.text)}</p>
      <p class="quote-item-author">${q.author ? escapeHtml(q.author) : '—'}</p>
      <button class="delete-quote" aria-label="Удалить фразу">&times;</button>
    </div>
  `).join('');

  modal.innerHTML = `
    <div class="modal-content modal-content--wide">
      <div class="modal-header">
        <h2 id="quotesTitle">Мотивационные фразы</h2>
        <button class="modal-close" aria-label="Закрыть">&times;</button>
      </div>
      <div class="quotes-section">
        <h3>Добавить новую фразу</h3>
        <form id="addQuoteForm">
          <div class="form-group">
            <label for="quoteTextInput">Текст фразы:</label>
            <textarea id="quoteTextInput" required rows="3" placeholder="Введите мотивационную фразу..."></textarea>
          </div>
          <div class="form-group">
            <label for="quoteAuthorInput">Автор (необязательно):</label>
            <input type="text" id="quoteAuthorInput" placeholder="Неизвестный">
          </div>
          <button type="submit" class="primary-button">Добавить фразу</button>
        </form>
      </div>
      <div class="quotes-section">
        <h3>Ваши фразы (${customQuotes.length})</h3>
        <div class="quotes-list">
          ${quotesList || '<p class="empty-state">У вас пока нет собственных фраз</p>'}
        </div>
      </div>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
    if (e.target.classList.contains('delete-quote')) {
      const id = parseInt(e.target.closest('.quote-item').dataset.id);
      Storage.deleteCustomQuote(id);
      showToast('Фраза удалена');
      refreshQuotesModal(modal);
    }
  });

  modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));

  modal.querySelector('#addQuoteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('quoteTextInput').value.trim();
    const author = document.getElementById('quoteAuthorInput').value.trim();
    
    if (text) {
      Storage.addCustomQuote({ text, author: author || null });
      document.getElementById('quoteTextInput').value = '';
      document.getElementById('quoteAuthorInput').value = '';
      showToast('Фраза добавлена');
      refreshQuotesModal(modal);
    }
  });

  return modal;
}

function createHistoryModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'historyModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'historyTitle');
  modal.setAttribute('aria-modal', 'true');

  const history = Storage.getHistory();
  const historyList = history.map(h => `
    <div class="history-item" data-id="${h.id}">
      <div class="history-info">
        <p class="history-dates">${SHORT_DATE_FORMATTER.format(h.startTime)} - ${SHORT_DATE_FORMATTER.format(h.endTime)}</p>
        <p class="history-duration">${formatDurationLabel(h.endTime - h.startTime)}</p>
        ${h.note ? `<p class="history-note">${escapeHtml(h.note)}</p>` : ''}
      </div>
      <button class="delete-history" aria-label="Удалить запись">&times;</button>
    </div>
  `).join('');

  modal.innerHTML = `
    <div class="modal-content modal-content--wide">
      <div class="modal-header">
        <h2 id="historyTitle">История голодовок</h2>
        <button class="modal-close" aria-label="Закрыть">&times;</button>
      </div>
      <div class="history-section">
        <button id="saveCurrentToHistory" class="primary-button">Сохранить текущую голодовку</button>
      </div>
      <div class="history-list">
        ${historyList || '<p class="empty-state">История пуста</p>'}
      </div>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
    if (e.target.classList.contains('delete-history')) {
      const id = parseInt(e.target.closest('.history-item').dataset.id);
      Storage.deleteFromHistory(id);
      showToast('Запись удалена');
      refreshHistoryModal(modal);
    }
    if (e.target.id === 'saveCurrentToHistory') {
      const startTime = Storage.getStartTime();
      const endTime = Storage.getEndTime();
      const note = prompt('Добавьте заметку (необязательно):');
      Storage.addToHistory({ startTime, endTime, note: note || null });
      showToast('Сохранено в историю');
      refreshHistoryModal(modal);
    }
  });

  modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));

  return modal;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function closeModal(modal) {
  modal.classList.add('closing');
  setTimeout(() => modal.remove(), 300);
}

function refreshQuotesModal(modal) {
  const newModal = createQuotesModal();
  modal.innerHTML = newModal.innerHTML;
  modal.className = newModal.className;
  modal.id = newModal.id;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'quotesTitle');
  modal.setAttribute('aria-modal', 'true');
}

function refreshHistoryModal(modal) {
  const newModal = createHistoryModal();
  modal.innerHTML = newModal.innerHTML;
  modal.className = newModal.className;
  modal.id = newModal.id;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'historyTitle');
  modal.setAttribute('aria-modal', 'true');
}

function createActionButtons() {
  const container = document.createElement('div');
  container.className = 'action-buttons';
  
  container.innerHTML = `
    <button class="action-button" id="settingsBtn" aria-label="Настройки">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 6.34L2.1 2.1m18.8 9.9h-6m-6 0H2.1m16.12 4.24l4.24 4.24M6.34 17.66l-4.24 4.24"/>
      </svg>
      <span>Настройки</span>
    </button>
    <button class="action-button" id="quotesBtn" aria-label="Фразы">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span>Фразы</span>
    </button>
    <button class="action-button" id="shareBtn" aria-label="Поделиться">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
      <span>Поделиться</span>
    </button>
    <button class="action-button" id="themeBtn" aria-label="Сменить тему">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <span>Тема</span>
    </button>
    <button class="action-button" id="historyBtn" aria-label="История">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
      </svg>
      <span>История</span>
    </button>
  `;

  container.querySelector('#settingsBtn').addEventListener('click', () => {
    document.body.appendChild(createSettingsModal());
  });

  container.querySelector('#quotesBtn').addEventListener('click', () => {
    document.body.appendChild(createQuotesModal());
  });

  container.querySelector('#shareBtn').addEventListener('click', () => {
    const state = getState(Date.now());
    shareProgress(state);
  });

  container.querySelector('#themeBtn').addEventListener('click', () => {
    const currentTheme = Storage.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    Storage.setTheme(newTheme);
    showToast(newTheme === 'dark' ? 'Тёмная тема включена' : 'Светлая тема включена');
  });

  container.querySelector('#historyBtn').addEventListener('click', () => {
    document.body.appendChild(createHistoryModal());
  });

  return container;
}

// ==================== SERVICE WORKER ====================

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const serviceWorkerUrl = new URL('./service-worker.js', window.location.href);
    const registration = await navigator.serviceWorker.register(serviceWorkerUrl);
    
    // Запрашиваем разрешение на уведомления при регистрации, если ранее было включено
    if (Storage.areNotificationsEnabled()) {
      requestNotificationPermission();
    }
  } catch (error) {
    console.error('Не удалось зарегистрировать service worker:', error);
  }
}

// ==================== ОСНОВНОЙ ЦИКЛ ====================

let lastUpdate = 0;

function updateLoop(timestamp) {
  // Обновляем каждую секунду
  if (timestamp - lastUpdate >= 1000) {
    const now = Date.now();
    const state = getState(now);

    updateProgress(state);
    updateCountdown(state, now);
    updateStaticLabels(state);
    checkMilestones(state);

    lastUpdate = timestamp;
  }

  requestAnimationFrame(updateLoop);
}

function updateUI() {
  const now = Date.now();
  const state = getState(now);
  
  updateProgress(state);
  updateCountdown(state, now);
  updateStaticLabels(state);
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

function init() {
  // Инициализируем DOM-ссылки
  initRefs();
  
  // Применяем сохранённую тему
  Storage.setTheme(Storage.getTheme());

  // Добавляем кнопки действий
  const heroMeta = document.querySelector('.hero-meta');
  if (heroMeta) {
    heroMeta.after(createActionButtons());
  }

  // Начальное обновление
  updateUI();
  showRandomQuote();
  registerServiceWorker();

  // Обработчики событий
  refs.nextQuoteButton.addEventListener('click', showRandomQuote);
  refs.nextQuoteButton.setAttribute('aria-label', 'Показать новую мотивационную фразу');

  // Запускаем цикл обновления через requestAnimationFrame
  requestAnimationFrame(updateLoop);

  // Смена фразы каждую минуту
  setInterval(showRandomQuote, 60000);
}

document.addEventListener('DOMContentLoaded', init);
