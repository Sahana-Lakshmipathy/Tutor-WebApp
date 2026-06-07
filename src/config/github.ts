// Set these to point at YOUR GitHub repo where problems/ JSONs live
export const GITHUB = {
  owner: 'Sahana-Lakshmipathy',
  repo: 'Tutor-WebApp',
  branch: 'main',
  problemsPath: 'github-problems/problems',
  // Optional: add a personal access token if you hit rate limits (60 req/hr unauthenticated)
  // token: import.meta.env.VITE_GITHUB_TOKEN,
};

export const rawBase = `https://raw.githubusercontent.com/${GITHUB.owner}/${GITHUB.repo}/${GITHUB.branch}`;
export const apiBase = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents`;
