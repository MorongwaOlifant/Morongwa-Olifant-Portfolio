export function getAccentClasses(accent = 'green') {
  const isGreen = accent === 'green';
  if (isGreen) {
    return {
      bg: 'bg-[#25D366]',
      text: 'text-[#25D366]',
      border: 'border-[#25D366]',
      focusRing: 'focus:ring-[#25D366]/40',
    };
  }
  return {
    bg: 'bg-[#FBC340]',
    text: 'text-[#FBC340]',
    border: 'border-[#FBC340]',
    focusRing: 'focus:ring-[#FBC340]/40',
  };
}

