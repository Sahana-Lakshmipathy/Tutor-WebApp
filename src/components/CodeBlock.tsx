import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';

interface Props {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute('data-highlighted');
      hljs.highlightElement(ref.current);
    }
  }, [code, language]);

  const copy = () => navigator.clipboard.writeText(code);

  return (
    <div className="border border-gray-200 dark:border-[#222] rounded-md overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-[#222]">
        <span className="font-mono text-[11px] text-gray-400 dark:text-[#444]">{language}</span>
        <button
          onClick={copy}
          className="text-[11px] text-gray-400 dark:text-[#555] border border-gray-200 dark:border-[#2a2a2a] px-3 py-1 rounded-sm hover:border-gray-600 dark:hover:border-white hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
        >
          Copy
        </button>
      </div>
      <pre className="m-0 p-0 overflow-x-auto text-[13.5px] leading-[1.65]">
        <code ref={ref} className={`language-${language} !p-5 !rounded-none font-mono`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
