import type { ProblemMeta } from '../types/problem';
import './Sidebar.css';

interface Props {
  problems: ProblemMeta[];
  loading: boolean;
  error: string | null;
  selected: string | null;
  onSelect: (filename: string) => void;
}

const difficultyClass: Record<string, string> = {
  Easy: 'diff-easy',
  Medium: 'diff-medium',
  Hard: 'diff-hard',
};

export default function Sidebar({ problems, loading, error, selected, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">DSA Revision</span>
        <span className="sidebar-count">{problems.length} problems</span>
      </div>

      <div className="sidebar-list">
        {loading && <div className="sidebar-state">Loading problems...</div>}
        {error && <div className="sidebar-state error">{error}</div>}
        {!loading && !error && problems.length === 0 && (
          <div className="sidebar-state">No problems found. Add JSON files to your GitHub repo.</div>
        )}
        {problems.map(p => (
          <button
            key={p.filename}
            className={`sidebar-item ${selected === p.filename ? 'active' : ''}`}
            onClick={() => onSelect(p.filename)}
          >
            <span className="sidebar-item-id">#{p.id}</span>
            <span className="sidebar-item-title">{p.title}</span>
            <span className={`sidebar-item-diff ${difficultyClass[p.difficulty] ?? ''}`}>
              {p.difficulty}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
