import type { ProblemMeta } from '../types/problem';

interface Props {
  problems: ProblemMeta[];
  loading: boolean;
  error: string | null;
  selected: string | null;
  onSelect: (filename: string) => void;
  dark: boolean;
  onToggleTheme: () => void;
}

const diffClass: Record<string, string> = {
  Easy:   'text-green-500 border border-green-500/30',
  Medium: 'text-amber-500 border border-amber-500/30',
  Hard:   'text-red-500   border border-red-500/30',
};

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Sidebar({ problems, loading, error, selected, onSelect, dark, onToggleTheme }: Props) {
  return (
    <aside className="w-64 min-w-[240px] bg-gray-50 dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-[#1f1f1f] flex flex-col h-screen sticky top-0 shrink-0">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 dark:border-[#1f1f1f] flex items-center justify-between">
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-white">
            DSA Revision
          </div>
          <div className="text-[11px] text-gray-400 dark:text-[#444] mt-0.5">
            {problems.length} problems
          </div>
        </div>
        <button
          onClick={onToggleTheme}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-1.5 rounded-md text-gray-400 dark:text-[#555] hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2">
        {loading && (
          <p className="px-4 py-4 text-xs text-gray-400 dark:text-[#444]">Loading problems...</p>
        )}
        {error && (
          <p className="px-4 py-4 text-xs text-red-500 leading-relaxed">{error}</p>
        )}
        {!loading && !error && problems.length === 0 && (
          <p className="px-4 py-4 text-xs text-gray-400 dark:text-[#444] leading-relaxed">
            No problems found. Add JSON files to your GitHub repo.
          </p>
        )}

        {problems.map(p => (
          <button
            key={p.filename}
            onClick={() => onSelect(p.filename)}
            className={[
              'w-full flex items-center gap-2 px-4 py-2.5 text-left transition-colors border-l-2',
              selected === p.filename
                ? 'bg-gray-200 dark:bg-[#181818] text-gray-900 dark:text-white border-l-gray-900 dark:border-l-white'
                : 'text-gray-500 dark:text-[#888] hover:bg-gray-100 dark:hover:bg-[#111] hover:text-gray-900 dark:hover:text-white border-l-transparent',
            ].join(' ')}
          >
            <span className="font-mono text-[10px] text-gray-300 dark:text-[#3a3a3a] min-w-[30px]">#{p.id}</span>
            <span className="flex-1 text-[13px] truncate">{p.title}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm shrink-0 ${diffClass[p.difficulty] ?? ''}`}>
              {p.difficulty}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
