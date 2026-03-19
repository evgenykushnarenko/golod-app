import { describe, it, expect } from 'vitest';

// These functions are extracted from app.js for testing

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

// Test constants
const START_TIME = new Date(2026, 2, 10, 22, 0, 0).getTime();
const END_TIME = new Date(2026, 2, 31, 22, 0, 0).getTime();

function getState(now, startTime = START_TIME, endTime = END_TIME) {
  const totalDuration = Math.max(endTime - startTime, 1);
  
  if (now < startTime) {
    return {
      phase: 'upcoming',
      label: 'До старта',
      status: 'Подготовка',
      progress: 0,
      timeLeft: startTime - now,
      elapsed: 0,
      remaining: totalDuration
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
      remaining: 0
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
    remaining
  };
}

describe('formatClockParts', () => {
  it('formats zero milliseconds correctly', () => {
    const result = formatClockParts(0);
    expect(result).toEqual({
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    });
  });

  it('formats 1 day correctly', () => {
    const ms = 24 * 60 * 60 * 1000; // 1 day in ms
    const result = formatClockParts(ms);
    expect(result.days).toBe('01');
  });

  it('formats 1 hour correctly', () => {
    const ms = 60 * 60 * 1000; // 1 hour in ms
    const result = formatClockParts(ms);
    expect(result.hours).toBe('01');
  });

  it('formats 1 minute correctly', () => {
    const ms = 60 * 1000; // 1 minute in ms
    const result = formatClockParts(ms);
    expect(result.minutes).toBe('01');
  });

  it('formats 1 second correctly', () => {
    const ms = 1000; // 1 second in ms
    const result = formatClockParts(ms);
    expect(result.seconds).toBe('01');
  });

  it('handles negative values as zero', () => {
    const result = formatClockParts(-1000);
    expect(result).toEqual({
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    });
  });

  it('formats complex duration correctly', () => {
    // 2 days, 3 hours, 4 minutes, 5 seconds
    const ms = (2 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000) + (4 * 60 * 1000) + (5 * 1000);
    const result = formatClockParts(ms);
    expect(result).toEqual({
      days: '02',
      hours: '03',
      minutes: '04',
      seconds: '05'
    });
  });
});

describe('formatDurationLabel', () => {
  it('formats zero milliseconds as "0 мин"', () => {
    expect(formatDurationLabel(0)).toBe('0 мин');
  });

  it('formats negative values as "0 мин"', () => {
    expect(formatDurationLabel(-1000)).toBe('0 мин');
  });

  it('formats minutes only', () => {
    expect(formatDurationLabel(30 * 60 * 1000)).toBe('30 мин');
  });

  it('formats hours only (no days)', () => {
    expect(formatDurationLabel(5 * 60 * 60 * 1000)).toBe('5 ч');
  });

  it('formats days only (no hours)', () => {
    expect(formatDurationLabel(2 * 24 * 60 * 60 * 1000)).toBe('2 д');
  });

  it('formats days and hours', () => {
    expect(formatDurationLabel((2 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000))).toBe('2 д 5 ч');
  });

  it('limits output to 2 parts', () => {
    expect(formatDurationLabel((2 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (30 * 60 * 1000))).toBe('2 д 5 ч');
  });
});

describe('getState', () => {
  const startTime = new Date(2026, 2, 10, 22, 0, 0).getTime();
  const endTime = new Date(2026, 2, 31, 22, 0, 0).getTime();

  it('returns "upcoming" phase before start', () => {
    const beforeStart = startTime - 1000 * 60 * 60; // 1 hour before start
    const state = getState(beforeStart, startTime, endTime);
    
    expect(state.phase).toBe('upcoming');
    expect(state.progress).toBe(0);
  });

  it('returns "active" phase during fasting', () => {
    const middleTime = startTime + (endTime - startTime) / 2;
    const state = getState(middleTime, startTime, endTime);
    
    expect(state.phase).toBe('active');
    expect(state.progress).toBeGreaterThan(0);
    expect(state.progress).toBeLessThan(100);
  });

  it('returns "completed" phase after end', () => {
    const afterEnd = endTime + 1000 * 60 * 60; // 1 hour after end
    const state = getState(afterEnd, startTime, endTime);
    
    expect(state.phase).toBe('completed');
    expect(state.progress).toBe(100);
  });

  it('calculates correct progress at 50%', () => {
    const halfTime = startTime + (endTime - startTime) / 2;
    const state = getState(halfTime, startTime, endTime);
    
    expect(state.progress).toBeCloseTo(50, 1);
  });

  it('handles edge case when endTime equals startTime', () => {
    const sameTime = Date.now();
    const state = getState(sameTime, sameTime, sameTime);
    
    expect(state.progress).toBe(100);
  });
});
