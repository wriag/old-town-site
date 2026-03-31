import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-surface': 'var(--bg-surface)',
        'bg-alt': 'var(--bg-alt)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
