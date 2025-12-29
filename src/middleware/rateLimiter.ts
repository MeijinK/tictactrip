const DAILY_LIMIT = 80000;

interface TokenCounter {
  wordCount: number;
  date: string;
}

const counters = new Map<string, TokenCounter>();

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function countWords(text: string): number {
  const normalizedText = text.replace(/\s+/g, ' ').trim();
  if (!normalizedText) {
    return 0;
  }
  return normalizedText.split(' ').length;
}

export function checkLimit(token: string, wordCount: number): boolean {
  const today = getTodayDate();
  const counter = counters.get(token);

  if (!counter) {
    return wordCount <= DAILY_LIMIT;
  }

  if (counter.date !== today) {
    return wordCount <= DAILY_LIMIT;
  }

  return counter.wordCount + wordCount <= DAILY_LIMIT;
}

export function incrementCounter(token: string, wordCount: number): void {
  const today = getTodayDate();
  const counter = counters.get(token);

  if (!counter || counter.date !== today) {
    counters.set(token, {
      wordCount: wordCount,
      date: today,
    });
  } else {
    counter.wordCount += wordCount;
  }
}
