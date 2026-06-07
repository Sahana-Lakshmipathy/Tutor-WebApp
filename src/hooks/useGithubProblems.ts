import { useState, useEffect } from 'react';
import { GITHUB, GITHUB_TOKEN, apiBase, rawBase } from '../config/github';
import type { Problem, ProblemMeta } from '../types/problem';

function apiHeaders(): HeadersInit {
  return GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
}

interface GithubFile {
  name: string;
  type: string;
  download_url: string;
}

function parseMeta(filename: string): ProblemMeta | null {
  // Expects filenames like "542-01-matrix.json"
  const match = filename.match(/^(\d+)-(.+)\.json$/);
  if (!match) return null;
  return {
    filename,
    id: match[1],
    title: match[2].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    difficulty: 'Medium', // will be overridden when full problem loads
  };
}

export function useProblems() {
  const [problems, setProblems] = useState<ProblemMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${apiBase}/${GITHUB.problemsPath}`;
    fetch(url, { headers: apiHeaders() })
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status} — check your owner/repo in config/github.ts`);
        return r.json() as Promise<GithubFile[]>;
      })
      .then(files => {
        const metas = files
          .filter(f => f.type === 'file' && f.name.endsWith('.json'))
          .map(f => parseMeta(f.name))
          .filter((m): m is ProblemMeta => m !== null)
          .sort((a, b) => Number(a.id) - Number(b.id));
        setProblems(metas);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { problems, loading, error };
}

export function useProblem(filename: string | null) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filename) return;
    setLoading(true);
    setError(null);
    setProblem(null);

    const url = `${rawBase}/${GITHUB.problemsPath}/${filename}`;
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load problem: ${r.status}`);
        return r.json() as Promise<Problem>;
      })
      .then(setProblem)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [filename]);

  return { problem, loading, error };
}
