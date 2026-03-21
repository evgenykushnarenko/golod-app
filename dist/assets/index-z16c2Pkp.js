(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{text:`Твое тело — это отражение твоего образа жизни.`,author:`Неизвестный`},{text:`Голод — это не слабость, это сила, которая очищает тело и разум.`,author:`Андрей Ветров`},{text:`Терпи еще немного — результат будет великолепен!`,author:`Неизвестный`},{text:`Каждая минута голодовки приближает тебя к здоровью и энергии.`,author:`Неизвестный`},{text:`Ты контролируешь свой голод — и это делает тебя сильнее!`,author:`Неизвестный`},{text:`Здоровье — это главная ценность, и ты заботишься о ней прямо сейчас.`,author:`Неизвестный`},{text:`Первые дни — самые сложные, но результат будет стоять усилий!`,author:`Неизвестный`},{text:`Твой дух сильнее любого голода!`,author:`Неизвестный`},{text:`Поверь в себя — ты уже прошел почти половину пути!`,author:`Неизвестный`},{text:`Голодовка — это дар, который ты даришь своему организму.`,author:`Неизвестный`},{text:`Твой желудок сейчас как VIP-зал в театре: пусто, но элегантно.`,author:`Доктор Пюрешкин`},{text:`Если бы калории платили аренду, ты бы стал миллионером за эти дни!`,author:`Барон де Сытость`},{text:`Голод — это когда желудок пишет петицию, а мозг её игнорирует. Так держать!`,author:`Профессор Желудоков`},{text:`Помни: каждый пропущенный приём пищи — это плюс один к твоей воле. Как в RPG!`,author:`Мастер Ом Ном`},{text:`Ты не голоден — ты просто переоцениваешь размер своего желудка. Он не стадион!`,author:`Капитан Морковка`},{text:`Аппетит приходит во время еды. Но ты умнее — ты его просто не зовёшь!`,author:`Доктор Аппетитов`},{text:`Пустота в желудке — это не баг, это фича. Или даже премиум-подписка на здоровье.`,author:`Гуру Пустота`},{text:`Метаболизм сейчас работает в режиме 'выживание в дикой природе'. Ты — леопард!`,author:`Профессор Метаболизмов`},{text:`Перекус? Не, не слышал. Я теперь из тех, кто 'просто забыл поесть'. Круто же!`,author:`Лорд Перекус`},{text:`Во Франции говорят: 'Голод — это когда платье снова застёгивается'. Правда, я это только что придумала.`,author:`Мадам Клетчатка`},{text:`Твои жировые запасы сейчас в панике: 'Босс, нас используют! Нампоминим ему про пиццу?' Нет!`,author:`Доктор Похудейкин`},{text:`Если бы голод можно было лайкать, я бы поставил твоему сегодняшнему дню два лайка. Но у меня только вода.`,author:`Инстаграм Де Суств`},{text:`Слушай свой организм. Если он говорит 'есть', спроси: 'А может, просто выпить воды и полежать?'`,author:`Мудрец Ленивый`},{text:`Ты сейчас как смартфон на энергосберегающем режиме. Дольше работаешь, меньше греешься!`,author:`Инженер Батарейкин`},{text:`Помни: каждый час без еды — это маленькая победа. Собери их все, как покемонов!`,author:`Тренер Джим`},{text:`Твой желудок сейчас отправил 'исходящее' письмо в мозг. Спам!`,author:`Сисадмин Жора`},{text:`В древности люди голодали потому что не было еды. Ты голодал по выбору. Это как киберпанк, только для желудка.`,author:`Историк Хруст`},{text:`Диета — это когда ешь то, что не нравится. Голодовка — когда не ешь, но чувствуешь себя богом.`,author:`Философ Неедимов`},{text:`Если бы воля к победе имела калории, ты бы уже набрал дефицит на следующий год!`,author:`Бухгалтер Счётоводов`},{text:`Твой холодильник сейчас как музей: можно смотреть, но нельзя трогать. Ты — охранник!`,author:`Куратор Холодильников`}],t=new Date(2026,2,10,22,0,0).getTime(),n=new Date(2026,2,31,22,0,0).getTime(),r=`ru-RU`,i={KEYS:{START_TIME:`fasting_start_time`,END_TIME:`fasting_end_time`,THEME:`fasting_theme`,CUSTOM_QUOTES:`fasting_custom_quotes`,HISTORY:`fasting_history`,NOTIFICATIONS_ENABLED:`fasting_notifications`,MILESTONES_NOTIFIED:`fasting_milestones`},get(e,t=null){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`Storage error:`,e)}},getStartTime(){return this.get(this.KEYS.START_TIME,t)},getEndTime(){return this.get(this.KEYS.END_TIME,n)},setStartTime(e){this.set(this.KEYS.START_TIME,e)},setEndTime(e){this.set(this.KEYS.END_TIME,e)},getTheme(){return this.get(this.KEYS.THEME,`dark`)},setTheme(e){this.set(this.KEYS.THEME,e),document.documentElement.setAttribute(`data-theme`,e)},getCustomQuotes(){return this.get(this.KEYS.CUSTOM_QUOTES,[])},addCustomQuote(e){let t=this.getCustomQuotes();return t.push({...e,id:Date.now(),isCustom:!0}),this.set(this.KEYS.CUSTOM_QUOTES,t),t},deleteCustomQuote(e){let t=this.getCustomQuotes().filter(t=>t.id!==e);return this.set(this.KEYS.CUSTOM_QUOTES,t),t},getAllQuotes(){return[...e,...this.getCustomQuotes()]},getHistory(){return this.get(this.KEYS.HISTORY,[])},addToHistory(e){let t=this.getHistory();t.unshift({...e,id:Date.now()}),t.length>50&&t.pop(),this.set(this.KEYS.HISTORY,t)},deleteFromHistory(e){let t=this.getHistory().filter(t=>t.id!==e);this.set(this.KEYS.HISTORY,t)},areNotificationsEnabled(){return this.get(this.KEYS.NOTIFICATIONS_ENABLED,!1)},setNotificationsEnabled(e){this.set(this.KEYS.NOTIFICATIONS_ENABLED,e)},getMilestonesNotified(){return this.get(this.KEYS.MILESTONES_NOTIFIED,{})},setMilestoneNotified(e){let t=this.getMilestonesNotified();t[e]=!0,this.set(this.KEYS.MILESTONES_NOTIFIED,t)},resetMilestones(){this.set(this.KEYS.MILESTONES_NOTIFIED,{})}},a=new Intl.DateTimeFormat(r,{day:`numeric`,month:`long`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}),o=new Intl.DateTimeFormat(r,{day:`numeric`,month:`long`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),s=new Intl.DateTimeFormat(r,{day:`numeric`,month:`short`}),c={currentTime:document.getElementById(`currentTime`),fastingStatus:document.getElementById(`fastingStatus`),rangeLabel:document.getElementById(`rangeLabel`),progressRing:document.getElementById(`progressRing`),progressPercent:document.getElementById(`progressPercent`),progressLabel:document.getElementById(`progressLabel`),progressTitle:document.getElementById(`progressTitle`),progressSummary:document.getElementById(`progressSummary`),countdownTitle:document.getElementById(`countdownTitle`),durationLabel:document.getElementById(`durationLabel`),days:document.getElementById(`days`),hours:document.getElementById(`hours`),minutes:document.getElementById(`minutes`),seconds:document.getElementById(`seconds`),startTimeLabel:document.getElementById(`startTimeLabel`),endTimeLabel:document.getElementById(`endTimeLabel`),elapsedValue:document.getElementById(`elapsedValue`),remainingValue:document.getElementById(`remainingValue`),quoteText:document.getElementById(`quoteText`),quoteAuthor:document.getElementById(`quoteAuthor`),nextQuoteButton:document.getElementById(`nextQuoteButton`),timerGrid:document.querySelector(`.timer-grid`)};function l(e){let t=Math.max(e,0),n=Math.floor(t/(1e3*60*60*24)),r=Math.floor(t%(1e3*60*60*24)/(1e3*60*60)),i=Math.floor(t%(1e3*60*60)/(1e3*60)),a=Math.floor(t%(1e3*60)/1e3);return{days:String(n).padStart(2,`0`),hours:String(r).padStart(2,`0`),minutes:String(i).padStart(2,`0`),seconds:String(a).padStart(2,`0`)}}function u(e){if(e<=0)return`0 мин`;let t=Math.floor(e/(1e3*60)),n=Math.floor(t/1440),r=Math.floor(t%1440/60),i=t%60,a=[];return n>0&&a.push(`${n} д`),r>0&&a.push(`${r} ч`),i>0&&n===0&&a.push(`${i} мин`),a.slice(0,2).join(` `)||`0 мин`}function d(e){if(!e)return null;let t=new Date(e);return isNaN(t.getTime())?null:t.getTime()}function f(e){let t=new Date(e);return t.setMinutes(t.getMinutes()-t.getTimezoneOffset()),t.toISOString().slice(0,16)}function p(e){let t=i.getStartTime(),n=i.getEndTime(),r=Math.max(n-t,1);if(e<t)return{phase:`upcoming`,label:`До старта`,status:`Подготовка`,progress:0,timeLeft:t-e,elapsed:0,remaining:r,startTime:t,endTime:n,totalDuration:r};if(e>=n)return{phase:`completed`,label:`Голодовка завершена`,status:`Финиш`,progress:100,timeLeft:0,elapsed:r,remaining:0,startTime:t,endTime:n,totalDuration:r};let a=e-t,o=n-e;return{phase:`active`,label:`До завершения`,status:`В процессе`,progress:a/r*100,timeLeft:o,elapsed:a,remaining:o,startTime:t,endTime:n,totalDuration:r}}function m(e){let t=Math.round(e.progress);c.progressRing.style.setProperty(`--progress`,`${e.progress.toFixed(2)}%`),c.progressPercent.textContent=`${t}%`,c.progressLabel.textContent=e.phase===`completed`?`завершено`:`пройдено`,c.progressTitle.textContent=e.phase===`upcoming`?`Подготовка к старту`:`Путь до завершения`,e.phase===`upcoming`?c.progressSummary.textContent=`Отсчет уже запущен: сейчас экран ждёт стартового момента и держит весь план периода перед глазами.`:e.phase===`completed`?c.progressSummary.textContent=`Цель достигнута. Кольцо закрыто полностью, таймер остановлен на финальной точке.`:c.progressSummary.textContent=`Пройдено ${t}% пути. Внутри периода уже прошло ${u(e.elapsed)}.`}function h(e,t){let n=l(e.timeLeft);if(c.days.textContent=n.days,c.hours.textContent=n.hours,c.minutes.textContent=n.minutes,c.seconds.textContent=n.seconds,c.currentTime.textContent=`Сейчас: ${o.format(t)}`,c.countdownTitle.textContent=e.label,c.fastingStatus.textContent=e.status,c.fastingStatus.dataset.phase=e.phase,c.elapsedValue.textContent=u(e.elapsed),c.remainingValue.textContent=e.phase===`upcoming`?u(e.startTime-t):u(e.remaining),c.timerGrid){let e=`${n.days} дней, ${n.hours} часов, ${n.minutes} минут, ${n.seconds} секунд`;c.timerGrid.setAttribute(`aria-label`,`Оставшееся время: ${e}`)}}function g(e){c.rangeLabel.textContent=`${a.format(e.startTime)} - ${a.format(e.endTime)}`,c.startTimeLabel.textContent=a.format(e.startTime),c.endTimeLabel.textContent=a.format(e.endTime),c.durationLabel.textContent=`Длительность периода: ${u(e.totalDuration)}`}async function _(){if(!(`Notification`in window))return!1;let e=await Notification.requestPermission()===`granted`;return i.setNotificationsEnabled(e),e}async function v(e,t){i.areNotificationsEnabled()&&`serviceWorker`in navigator&&navigator.serviceWorker.controller&&navigator.serviceWorker.ready.then(n=>{n.showNotification(e,{body:t,icon:`./icon.svg`,badge:`./icon.svg`,tag:`fasting-reminder`})})}function y(e){if(!i.areNotificationsEnabled()||e.phase!==`active`)return;let t=[25,50,75,100],n=Math.round(e.progress);for(let e of t)if(n>=e&&!i.getMilestonesNotified()[e]){i.setMilestoneNotified(e),e===100?v(`🎉 Поздравляем!`,`Вы успешно завершили голодовку!`):v(`📊 Прогресс голодовки`,`Вы прошли ${e}% пути! Продолжайте в том же духе!`);break}}var b=-1;function x(){let e=i.getAllQuotes();if(e.length===0){c.quoteText.textContent=`Добавьте мотивационные фразы.`,c.quoteAuthor.textContent=`—`;return}let t=Math.floor(Math.random()*e.length);if(e.length>1)for(;t===b;)t=Math.floor(Math.random()*e.length);b=t;let n=e[b];c.quoteText.textContent=n.text,c.quoteAuthor.textContent=n.author?`— ${n.author}`:`—`}async function S(e){let t={title:`Мой прогресс голодовки`,text:`Я на ${Math.round(e.progress)}% пути! Осталось ${u(e.remaining)}.`,url:window.location.href};if(navigator.share)try{await navigator.share(t)}catch(e){e.name!==`AbortError`&&(console.error(`Share failed:`,e),C(t.text))}else C(t.text)}function C(e){navigator.clipboard.writeText(e).then(()=>{w(`Текст скопирован в буфер обмена`)}).catch(()=>{w(`Не удалось скопировать текст`)})}function w(e,t=3e3){let n=document.querySelector(`.toast-notification`);n&&n.remove();let r=document.createElement(`div`);r.className=`toast-notification`,r.textContent=e,r.setAttribute(`role`,`status`),r.setAttribute(`aria-live`,`polite`),document.body.appendChild(r),requestAnimationFrame(()=>{r.classList.add(`show`)}),setTimeout(()=>{r.classList.remove(`show`),setTimeout(()=>r.remove(),300)},t)}function T(){let e=document.createElement(`div`);e.className=`modal-overlay`,e.id=`settingsModal`,e.setAttribute(`role`,`dialog`),e.setAttribute(`aria-labelledby`,`settingsTitle`),e.setAttribute(`aria-modal`,`true`);let r=i.getStartTime(),a=i.getEndTime(),o=i.areNotificationsEnabled();return e.innerHTML=`
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="settingsTitle">Настройки голодовки</h2>
        <button class="modal-close" aria-label="Закрыть настройки">&times;</button>
      </div>
      <form id="settingsForm">
        <div class="form-group">
          <label for="startDateTime">Дата и время начала:</label>
          <input type="datetime-local" id="startDateTime" required 
            value="${f(r)}">
        </div>
        <div class="form-group">
          <label for="endDateTime">Дата и время окончания:</label>
          <input type="datetime-local" id="endDateTime" required 
            value="${f(a)}">
        </div>
        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" id="enableNotifications" ${o?`checked`:``}>
            Включить уведомления о прогрессе
          </label>
        </div>
        <div class="form-actions">
          <button type="button" class="secondary-button" id="resetSettings">Сбросить</button>
          <button type="submit" class="primary-button">Сохранить</button>
        </div>
      </form>
    </div>
  `,e.addEventListener(`click`,t=>{t.target===e&&k(e)}),e.querySelector(`.modal-close`).addEventListener(`click`,()=>k(e)),e.querySelector(`#resetSettings`).addEventListener(`click`,()=>{confirm(`Сбросить настройки к значениям по умолчанию?`)&&(i.setStartTime(t),i.setEndTime(n),i.resetMilestones(),location.reload())}),e.querySelector(`#settingsForm`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`startDateTime`),r=document.getElementById(`endDateTime`),a=document.getElementById(`enableNotifications`),o=d(n.value),s=d(r.value);if(!o||!s){w(`Пожалуйста, введите корректные даты`);return}if(s<=o){w(`Дата окончания должна быть позже даты начала`);return}i.setStartTime(o),i.setEndTime(s),i.resetMilestones(),a.checked?await _():i.setNotificationsEnabled(!1),k(e),w(`Настройки сохранены`),I()}),e}function E(){let e=document.createElement(`div`);e.className=`modal-overlay`,e.id=`quotesModal`,e.setAttribute(`role`,`dialog`),e.setAttribute(`aria-labelledby`,`quotesTitle`),e.setAttribute(`aria-modal`,`true`);let t=i.getCustomQuotes(),n=t.map(e=>`
    <div class="quote-item" data-id="${e.id}">
      <p class="quote-item-text">${O(e.text)}</p>
      <p class="quote-item-author">${e.author?O(e.author):`—`}</p>
      <button class="delete-quote" aria-label="Удалить фразу">&times;</button>
    </div>
  `).join(``);return e.innerHTML=`
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
        <h3>Ваши фразы (${t.length})</h3>
        <div class="quotes-list">
          ${n||`<p class="empty-state">У вас пока нет собственных фраз</p>`}
        </div>
      </div>
    </div>
  `,e.addEventListener(`click`,t=>{if(t.target===e&&k(e),t.target.classList.contains(`delete-quote`)){let n=parseInt(t.target.closest(`.quote-item`).dataset.id);i.deleteCustomQuote(n),w(`Фраза удалена`),A(e)}}),e.querySelector(`.modal-close`).addEventListener(`click`,()=>k(e)),e.querySelector(`#addQuoteForm`).addEventListener(`submit`,t=>{t.preventDefault();let n=document.getElementById(`quoteTextInput`).value.trim(),r=document.getElementById(`quoteAuthorInput`).value.trim();n&&(i.addCustomQuote({text:n,author:r||null}),document.getElementById(`quoteTextInput`).value=``,document.getElementById(`quoteAuthorInput`).value=``,w(`Фраза добавлена`),A(e))}),e}function D(){let e=document.createElement(`div`);return e.className=`modal-overlay`,e.id=`historyModal`,e.setAttribute(`role`,`dialog`),e.setAttribute(`aria-labelledby`,`historyTitle`),e.setAttribute(`aria-modal`,`true`),e.innerHTML=`
    <div class="modal-content modal-content--wide">
      <div class="modal-header">
        <h2 id="historyTitle">История голодовок</h2>
        <button class="modal-close" aria-label="Закрыть">&times;</button>
      </div>
      <div class="history-section">
        <button id="saveCurrentToHistory" class="primary-button">Сохранить текущую голодовку</button>
      </div>
      <div class="history-list">
        ${i.getHistory().map(e=>`
    <div class="history-item" data-id="${e.id}">
      <div class="history-info">
        <p class="history-dates">${s.format(e.startTime)} - ${s.format(e.endTime)}</p>
        <p class="history-duration">${u(e.endTime-e.startTime)}</p>
        ${e.note?`<p class="history-note">${O(e.note)}</p>`:``}
      </div>
      <button class="delete-history" aria-label="Удалить запись">&times;</button>
    </div>
  `).join(``)||`<p class="empty-state">История пуста</p>`}
      </div>
    </div>
  `,e.addEventListener(`click`,t=>{if(t.target===e&&k(e),t.target.classList.contains(`delete-history`)){let n=parseInt(t.target.closest(`.history-item`).dataset.id);i.deleteFromHistory(n),w(`Запись удалена`),j(e)}if(t.target.id===`saveCurrentToHistory`){let t=i.getStartTime(),n=i.getEndTime(),r=prompt(`Добавьте заметку (необязательно):`);i.addToHistory({startTime:t,endTime:n,note:r||null}),w(`Сохранено в историю`),j(e)}}),e.querySelector(`.modal-close`).addEventListener(`click`,()=>k(e)),e}function O(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function k(e){e.classList.add(`closing`),setTimeout(()=>e.remove(),300)}function A(e){let t=E();e.innerHTML=t.innerHTML,e.className=t.className,e.id=t.id,e.setAttribute(`role`,`dialog`),e.setAttribute(`aria-labelledby`,`quotesTitle`),e.setAttribute(`aria-modal`,`true`)}function j(e){let t=D();e.innerHTML=t.innerHTML,e.className=t.className,e.id=t.id,e.setAttribute(`role`,`dialog`),e.setAttribute(`aria-labelledby`,`historyTitle`),e.setAttribute(`aria-modal`,`true`)}function M(){let e=document.createElement(`div`);return e.className=`action-buttons`,e.innerHTML=`
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
  `,e.querySelector(`#settingsBtn`).addEventListener(`click`,()=>{document.body.appendChild(T())}),e.querySelector(`#quotesBtn`).addEventListener(`click`,()=>{document.body.appendChild(E())}),e.querySelector(`#shareBtn`).addEventListener(`click`,()=>{S(p(Date.now()))}),e.querySelector(`#themeBtn`).addEventListener(`click`,()=>{let e=i.getTheme()===`dark`?`light`:`dark`;i.setTheme(e),w(e===`dark`?`Тёмная тема включена`:`Светлая тема включена`)}),e.querySelector(`#historyBtn`).addEventListener(`click`,()=>{document.body.appendChild(D())}),e}async function N(){if(`serviceWorker`in navigator)try{let e=new URL(`./service-worker.js`,window.location.href);await navigator.serviceWorker.register(e),i.areNotificationsEnabled()&&_()}catch(e){console.error(`Не удалось зарегистрировать service worker:`,e)}}var P=0;function F(e){if(e-P>=1e3){let t=Date.now(),n=p(t);m(n),h(n,t),g(n),y(n),P=e}requestAnimationFrame(F)}function I(){let e=Date.now(),t=p(e);m(t),h(t,e),g(t)}function L(){i.setTheme(i.getTheme());let e=document.querySelector(`.hero-meta`);e&&e.after(M()),I(),x(),N(),c.nextQuoteButton.addEventListener(`click`,x),c.nextQuoteButton.setAttribute(`aria-label`,`Показать новую мотивационную фразу`),requestAnimationFrame(F),setInterval(x,6e4)}document.addEventListener(`DOMContentLoaded`,L);