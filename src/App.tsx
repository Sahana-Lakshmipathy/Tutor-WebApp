import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProblemView from './components/ProblemView';
import { useProblems, useProblem } from './hooks/useGithubProblems';
import './App.css';

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const { problems, loading: listLoading, error: listError } = useProblems();
  const { problem, loading: problemLoading, error: problemError } = useProblem(selected);

  return (
    <div className="app">
      <Sidebar
        problems={problems}
        loading={listLoading}
        error={listError}
        selected={selected}
        onSelect={setSelected}
      />

      <main className="main">
        {!selected && (
          <div className="welcome">
            <div className="welcome-inner">
              <h2>DSA Revision</h2>
              <p>Select a problem from the sidebar to start studying.</p>
              <p className="welcome-hint">
                Problems load automatically from your GitHub repo.<br />
                Add a new JSON file to the <code>problems/</code> folder and it appears here.
              </p>
            </div>
          </div>
        )}

        {selected && problemLoading && (
          <div className="center-state">Loading...</div>
        )}

        {selected && problemError && (
          <div className="center-state error">{problemError}</div>
        )}

        {selected && problem && !problemLoading && (
          <ProblemView problem={problem} />
        )}
      </main>
    </div>
  );
}
