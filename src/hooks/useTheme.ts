import { useState, useLayoutEffect } from 'react';
import githubLightUrl from 'highlight.js/styles/github.css?url';
import githubDarkUrl from 'highlight.js/styles/github-dark.css?url';

function getOrCreateLink(): HTMLLinkElement {
  let link = document.getElementById('hljs-theme') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = 'hljs-theme';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  return link;
}

export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    const link = getOrCreateLink();

    if (dark) {
      root.classList.add('dark');
      link.href = githubDarkUrl;
    } else {
      root.classList.remove('dark');
      link.href = githubLightUrl;
    }

    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark(d => !d) };
}
