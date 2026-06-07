import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProblemView from './components/ProblemView';
import { useProblems, useProblem } from './hooks/useGithubProblems';
import { useTheme } from './hooks/useTheme';
import './App.css';

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const { problems, loading: listLoading, error: listError } = useProblems();
  const { problem, loading: problemLoading, error: problemError } = useProblem(selected);
  const { dark, toggle } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-black">
      <Sidebar
        problems={problems}
        loading={listLoading}
        error={listError}
        selected={selected}
        onSelect={setSelected}
        dark={dark}
        onToggleTheme={toggle}
      />

      <main className="flex-1 overflow-hidden flex flex-col">
        {!selected && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
              <h2 className="text-[22px] font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                DSA Revision
              </h2>
              <p className="text-[13px] text-gray-400 dark:text-[#555] mb-2">
                Select a problem from the sidebar to start studying.
              </p>
              <p className="text-[13px] text-gray-300 dark:text-[#333] leading-relaxed">
                Add a new JSON file to the{' '}
                <code className="font-mono text-[12px] text-gray-500 dark:text-[#555] bg-gray-100 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#222] rounded px-1.5 py-0.5">
                  problems/
                </code>{' '}
                folder on GitHub and it appears here automatically.
              </p>
            </div>
          </div>
        )}

        {selected && problemLoading && (
          <div className="flex-1 flex items-center justify-center text-[13px] text-gray-400 dark:text-[#444]">
            Loading...
          </div>
        )}

        {selected && problemError && (
          <div className="flex-1 flex items-center justify-center text-[13px] text-red-500">
            {problemError}
          </div>
        )}

        {selected && problem && !problemLoading && (
          <ProblemView problem={problem} />
        )}
      </main>
    </div>
  );
}
