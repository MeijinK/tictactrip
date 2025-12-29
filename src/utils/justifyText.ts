const LINE_LENGTH = 80;

export function justifyText(text: string): string {
  const normalizedText = text.replace(/\s+/g, ' ').trim();

  if (!normalizedText) {
    return '';
  }

  const words = normalizedText.split(' ');
  const lines: string[] = [];
  let currentLine: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    const lengthWithWord = currentLength + word.length + currentLine.length;

    if (lengthWithWord <= LINE_LENGTH) {
      currentLine.push(word);
      currentLength += word.length;
    } else {
      if (currentLine.length > 0) {
        lines.push(justifyLine(currentLine, false));
      }
      currentLine = [word];
      currentLength = word.length;
    }
  }

  if (currentLine.length > 0) {
    lines.push(justifyLine(currentLine, true));
  }

  return lines.join('\n');
}

function justifyLine(words: string[], isLastLine: boolean): string {
  if (words.length === 1) {
    return words[0];
  }

  if (isLastLine) {
    return words.join(' ');
  }

  const wordsLength = words.reduce((acc, word) => acc + word.length, 0);
  const totalSpaces = LINE_LENGTH - wordsLength;
  const gaps = words.length - 1;
  const spacesPerGap = Math.floor(totalSpaces / gaps);
  const extraSpaces = totalSpaces % gaps;

  let line = '';
  for (let i = 0; i < words.length; i++) {
    line += words[i];
    if (i < words.length - 1) {
      const spaces = spacesPerGap + (i < extraSpaces ? 1 : 0);
      line += ' '.repeat(spaces);
    }
  }

  return line;
}
