import { useState } from 'react';
import type { Problem } from '../types/problem';
import CodeBlock from './CodeBlock';
import MCQSection from './MCQSection';

interface Props {
  problem: Problem;
}

type Tab = 'problem' | 'intuition' | 'code' | 'mcq';

const TABS: { key: Tab; label: string }[] = [
  { key: 'problem',   label: 'Problem'   },
  { key: 'intuition', label: 'Intuition' },
  { key: 'code',      label: 'Code'      },
  { key: 'mcq',       label: 'MCQs'      },
];

const diffClass: Record<string, string> = {
  Easy:   'text-green-500 border border-green-500/30',
  Medium: 'text-amber-500 border border-amber-500/30',
  Hard:   'text-red-500   border border-red-500/30',
};

function formatText(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

const sectionLabel = 'text-[10px] font-bold tracking-widest uppercase text-gray-500 dark:text-[#555] mb-3';

export default function ProblemView({ problem }: Props) {
  const [tab, setTab] = useState<Tab>('problem');

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-gray-200 dark:border-[#1a1a1a] shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[11px] text-gray-400 dark:text-[#444]">#{problem.id}</span>
          <h1 className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight">{problem.title}</h1>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${diffClass[problem.difficulty] ?? ''}`}>
            {problem.difficulty}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {problem.tags.map(t => (
            <span key={t} className="text-[11px] text-gray-500 dark:text-[#555] bg-gray-100 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#1e1e1e] px-2 py-0.5 rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-8 border-b border-gray-200 dark:border-[#1a1a1a] bg-white dark:bg-black shrink-0">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              'py-3 mr-7 text-[13px] border-b-2 transition-colors cursor-pointer',
              tab === t.key
                ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white'
                : 'text-gray-400 dark:text-[#555] border-transparent hover:text-gray-700 dark:hover:text-[#bbb]',
            ].join(' ')}
          >
            {t.key === 'mcq' ? `MCQs (${problem.mcqs.length})` : t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-7">
        <div className="max-w-[820px] flex flex-col gap-7">

          {/* ── Problem ── */}
          {tab === 'problem' && (
            <>
              <div
                className="prose text-[14px] text-gray-700 dark:text-[#d0d0d0] leading-[1.8]"
                dangerouslySetInnerHTML={{ __html: formatText(problem.description) }}
              />

              {problem.examples && problem.examples.length > 0 && (
                <div>
                  <h3 className={sectionLabel}>Examples</h3>
                  <div className="flex flex-col gap-3">
                    {problem.examples.map((ex, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1e1e1e] rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-[#161616]">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#3a3a3a] min-w-[48px] pt-0.5">Input</span>
                          <code className="font-mono text-[13px] text-gray-800 dark:text-[#d8d8d8]">{ex.input}</code>
                        </div>
                        <div className="flex items-start gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-[#161616]">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#3a3a3a] min-w-[48px] pt-0.5">Output</span>
                          <code className="font-mono text-[13px] text-gray-800 dark:text-[#d8d8d8]">{ex.output}</code>
                        </div>
                        {ex.explanation && (
                          <div className="flex items-start gap-3 px-4 py-2.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#3a3a3a] min-w-[48px] pt-0.5">Why</span>
                            <span className="text-[13px] text-gray-500 dark:text-[#909090] leading-relaxed">{ex.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {problem.constraints && problem.constraints.length > 0 && (
                <div>
                  <h3 className={sectionLabel}>Constraints</h3>
                  <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                    {problem.constraints.map((c, i) => (
                      <li key={i}>
                        <code className="font-mono text-[12.5px] text-gray-700 dark:text-[#c8c8c8] bg-gray-50 dark:bg-[#0d0d0d] border border-gray-200 dark:border-[#1e1e1e] rounded px-2.5 py-1 inline-block">
                          {c}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* ── Intuition ── */}
          {tab === 'intuition' && (
            <>
              <div className="bg-gray-50 dark:bg-[#080808] border border-gray-200 dark:border-[#1e1e1e] border-l-2 border-l-gray-900 dark:border-l-white rounded-md px-5 py-4">
                <div
                  className="prose text-[14px] text-gray-700 dark:text-[#d0d0d0] leading-[1.8]"
                  dangerouslySetInnerHTML={{ __html: formatText(problem.intuition) }}
                />
              </div>

              <div>
                <h3 className={sectionLabel}>Approach — {problem.approach.name}</h3>
                <ol className="list-decimal list-outside pl-5 flex flex-col gap-2.5 m-0">
                  {problem.approach.steps.map((step, i) => (
                    <li key={i} className="text-[14px] text-gray-600 dark:text-[#c2c2c2] leading-[1.65] pl-1">{step}</li>
                  ))}
                </ol>
              </div>
            </>
          )}

          {/* ── Code ── */}
          {tab === 'code' && (
            <>
              <div>
                <h3 className={sectionLabel}>Primary — {problem.approach.name}</h3>
                <CodeBlock code={problem.code.solution} language={problem.code.language} />
              </div>

              {problem.alternate_approach && (
                <div>
                  <h3 className={sectionLabel}>Alternative — {problem.alternate_approach.name}</h3>
                  <div
                    className="prose text-[13.5px] text-gray-600 dark:text-[#b8b8b8] leading-[1.75] mb-4"
                    dangerouslySetInnerHTML={{ __html: formatText(problem.alternate_approach.description) }}
                  />
                  {problem.alternate_approach.when_to_prefer && (
                    <div className="mb-4 px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1e1e1e] rounded-md text-[13px] text-gray-500 dark:text-[#a0a0a0] leading-relaxed">
                      <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-[#555] mb-1">When to prefer</span>
                      {problem.alternate_approach.when_to_prefer}
                    </div>
                  )}
                  {problem.alternate_approach.code && (
                    <CodeBlock
                      code={problem.alternate_approach.code.solution}
                      language={problem.alternate_approach.code.language}
                    />
                  )}
                </div>
              )}
            </>
          )}

          {/* ── MCQs ── */}
          {tab === 'mcq' && (
            <MCQSection mcqs={problem.mcqs} />
          )}
        </div>
      </div>
    </div>
  );
}
