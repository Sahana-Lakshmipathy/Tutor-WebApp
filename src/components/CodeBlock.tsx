import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import './CodeBlock.css';

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
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{language}</span>
        <button className="code-copy" onClick={copy}>Copy</button>
      </div>
      <pre className="code-pre">
        <code ref={ref} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
