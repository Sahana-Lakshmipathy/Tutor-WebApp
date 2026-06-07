# DSA Revision App — Setup

## 1. Create your GitHub problems repo

Create a new **public** GitHub repository (e.g. `dsa-problems`).
Inside it, create a folder called `problems/`.
Upload `github-problems/problems/542-01-matrix.json` from this project as a starting point.

## 2. Point the app at your repo

Edit `src/config/github.ts`:

```ts
export const GITHUB = {
  owner: 'your-github-username',   // e.g. 'sahanalp'
  repo:  'dsa-problems',           // the repo you just created
  branch: 'main',
  problemsPath: 'problems',
};
```

## 3. Run the app

```bash
npm run dev
```

## 4. Add a new problem

Create a new JSON file in your GitHub repo under `problems/`, following this naming convention:

```
{leetcode-number}-{slug}.json
e.g. 994-rotting-oranges.json
```

Refresh the app — it appears in the sidebar automatically.

## JSON schema

```json
{
  "id": "542",
  "title": "01 Matrix",
  "difficulty": "Easy | Medium | Hard",
  "tags": ["BFS", "..."],
  "description": "Problem statement. Supports **bold** and `inline code`.",
  "examples": [
    { "input": "...", "output": "...", "explanation": "optional" }
  ],
  "constraints": ["1 <= n <= 10^4"],
  "intuition": "Explain the aha-moment. Supports **bold** and `code`.",
  "approach": {
    "name": "Algorithm name",
    "steps": ["Step 1", "Step 2"]
  },
  "code": {
    "language": "python",
    "solution": "def solve(): ..."
  },
  "mcqs": [
    {
      "id": 1,
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": 0,
      "explanation": "Why this is correct."
    }
  ]
}
```

## Rate limits

GitHub API allows 60 unauthenticated requests/hour. For a study session this is plenty.
If you hit limits, create a GitHub Personal Access Token and set `VITE_GITHUB_TOKEN=ghp_...` in `.env.local`,
then uncomment the token line in `src/config/github.ts`.
