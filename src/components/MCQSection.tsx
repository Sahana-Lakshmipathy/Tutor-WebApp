import { useState } from 'react';
import type { MCQ } from '../types/problem';
import './MCQSection.css';

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
      prev.map((s, i) =>
        i === qi && !s.revealed ? { selected: oi, revealed: true } : s
      )
    );
  };

  const reset = () => setStates(mcqs.map(() => ({ selected: null, revealed: false })));

  return (
    <div className="mcq-section">
      <div className="mcq-header">
        <span className="mcq-title">Practice MCQs</span>
        {attempted > 0 && (
          <span className="mcq-score">
            {score}/{attempted} correct
          </span>
        )}
        <button className="mcq-reset" onClick={reset}>Reset</button>
      </div>

      <div className="mcq-list">
        {mcqs.map((mcq, qi) => {
          const state = states[qi];
          return (
            <div key={mcq.id} className="mcq-item">
              <p className="mcq-q">
                <span className="mcq-num">Q{qi + 1}.</span> {mcq.question}
              </p>
              <div className="mcq-options">
                {mcq.options.map((opt, oi) => {
                  let cls = 'mcq-option';
                  if (state.revealed) {
                    if (oi === mcq.answer) cls += ' correct';
                    else if (oi === state.selected) cls += ' wrong';
                    else cls += ' dim';
                  } else if (state.selected === oi) {
                    cls += ' selected';
                  }
                  return (
                    <button
                      key={oi}
                      className={cls}
                      onClick={() => select(qi, oi)}
                      disabled={state.revealed}
                    >
                      <span className="mcq-opt-letter">{String.fromCharCode(65 + oi)}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {state.revealed && (
                <div className="mcq-explanation">
                  <span className="mcq-exp-label">Explanation</span>
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
