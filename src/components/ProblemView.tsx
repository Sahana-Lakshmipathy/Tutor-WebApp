import { useState } from 'react';
import type { Problem } from '../types/problem';
import CodeBlock from './CodeBlock';
import MCQSection from './MCQSection';
import './ProblemView.css';

interface Props {
  problem: Problem;
}

type Tab = 'problem' | 'intuition' | 'code' | 'mcq';

const TABS: { key: Tab; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'intuition', label: 'Intuition' },
  { key: 'code', label: 'Code' },
  { key: 'mcq', label: `MCQs` },
];

const diffClass: Record<string, string> = {
  Easy: 'diff-easy',
  Medium: 'diff-medium',
  Hard: 'diff-hard',
};

export default function ProblemView({ problem }: Props) {
  const [tab, setTab] = useState<Tab>('problem');

  return (
    <div className="pv">
      {/* Header */}
      <div className="pv-header">
        <div className="pv-meta">
          <span className="pv-id">#{problem.id}</span>
          <h1 className="pv-title">{problem.title}</h1>
          <span className={`pv-diff ${diffClass[problem.difficulty] ?? ''}`}>
            {problem.difficulty}
          </span>
        </div>
        <div className="pv-tags">
          {problem.tags.map(t => (
            <span key={t} className="pv-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="pv-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`pv-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.key === 'mcq' ? `MCQs (${problem.mcqs.length})` : t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="pv-content">
        {tab === 'problem' && (
          <div className="pv-section">
            <div className="prose" dangerouslySetInnerHTML={{ __html: formatText(problem.description) }} />

            {problem.examples && problem.examples.length > 0 && (
              <div className="pv-examples">
                <h3 className="section-label">Examples</h3>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="example-block">
                    <div className="example-row"><span className="ex-label">Input</span><code>{ex.input}</code></div>
                    <div className="example-row"><span className="ex-label">Output</span><code>{ex.output}</code></div>
                    {ex.explanation && (
                      <div className="example-row"><span className="ex-label">Why</span><span className="ex-explain">{ex.explanation}</span></div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {problem.constraints && problem.constraints.length > 0 && (
              <div className="pv-constraints">
                <h3 className="section-label">Constraints</h3>
                <ul className="constraint-list">
                  {problem.constraints.map((c, i) => (
                    <li key={i}><code>{c}</code></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'intuition' && (
          <div className="pv-section">
            <div className="intuition-block">
              <div className="prose" dangerouslySetInnerHTML={{ __html: formatText(problem.intuition) }} />
            </div>

            <div className="approach-block">
              <h3 className="section-label">Approach — {problem.approach.name}</h3>
              <ol className="approach-steps">
                {problem.approach.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {tab === 'code' && (
          <div className="pv-section">
            <CodeBlock code={problem.code.solution} language={problem.code.language} />
          </div>
        )}

        {tab === 'mcq' && (
          <div className="pv-section">
            <MCQSection mcqs={problem.mcqs} />
          </div>
        )}
      </div>
    </div>
  );
}

// Preserve newlines as <br> and bold **text**
function formatText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}
