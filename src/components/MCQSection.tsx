import { useState } from 'react';
import type { MCQ } from '../types/problem';

interface Props {
  mcqs: MCQ[];
}

interface MCQState {
  selected: number | null;
  revealed: boolean;
}

export default function MCQSection({ mcqs }: Props) {
  const [states, setStates] = useState<MCQState[]>(() =>
    mcqs.map(() => ({ selected: null, revealed: false }))
  );

  const score = states.filter((s, i) => s.revealed && s.selected === mcqs[i].answer).length;
  const attempted = states.filter(s => s.revealed).length;

  const select = (qi: number, oi: number) => {
    setStates(prev =>
      prev.map((s, i) => i === qi && !s.revealed ? { selected: oi, revealed: true } : s)
    );
  };

  const reset = () => setStates(mcqs.map(() => ({ selected: null, revealed: false })));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[15px] font-semibold text-gray-900 dark:text-white flex-1">Practice MCQs</span>
        {attempted > 0 && (
          <span className="font-mono text-xs text-gray-500 dark:text-[#808080]">{score}/{attempted} correct</span>
        )}
        <button
          onClick={reset}
          className="text-[11px] text-gray-500 dark:text-[#777] border border-gray-200 dark:border-[#2a2a2a] px-3 py-1 rounded-sm hover:border-gray-500 dark:hover:border-[#666] hover:text-gray-700 dark:hover:text-[#bbb] transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-7">
        {mcqs.map((mcq, qi) => {
          const state = states[qi];
          return (
            <div key={mcq.id}>
              <p className="text-[14px] text-gray-800 dark:text-[#d8d8d8] leading-[1.7] mb-3">
                <span className="font-mono text-[11px] text-gray-300 dark:text-[#3a3a3a] mr-1.5">Q{qi + 1}.</span>
                {mcq.question}
              </p>

              <div className="flex flex-col gap-2">
                {mcq.options.map((opt, oi) => {
                  let cls = 'flex items-start gap-2.5 px-3.5 py-2.5 rounded-md border text-[13px] leading-relaxed text-left transition-colors ';

                  if (state.revealed) {
                    if (oi === mcq.answer)
                      cls += 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 cursor-default';
                    else if (oi === state.selected)
                      cls += 'border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 cursor-default';
                    else
                      cls += 'border-gray-100 dark:border-[#1a1a1a] bg-gray-50 dark:bg-[#0d0d0d] text-gray-400 dark:text-[#555] cursor-default';
                  } else {
                    cls += 'border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#0f0f0f] text-gray-700 dark:text-[#c0c0c0] hover:border-gray-400 dark:hover:border-[#555] hover:text-gray-900 dark:hover:text-white cursor-pointer';
                  }

                  const letterCls = state.revealed
                    ? oi === mcq.answer     ? 'text-green-600 dark:text-green-500'
                    : oi === state.selected ? 'text-red-600 dark:text-red-500'
                    : 'text-gray-200 dark:text-[#2a2a2a]'
                    : 'text-gray-400 dark:text-[#4a4a4a]';

                  return (
                    <button key={oi} className={cls} onClick={() => select(qi, oi)} disabled={state.revealed}>
                      <span className={`font-mono text-[11px] font-bold min-w-[14px] pt-px ${letterCls}`}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {state.revealed && (
                <div className="mt-3 px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1e1e1e] border-l-2 border-l-gray-400 dark:border-l-[#555] rounded-md text-[13px] text-gray-600 dark:text-[#a8a8a8] leading-relaxed">
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-[#555] mb-1.5">
                    Explanation
                  </span>
                  {mcq.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
