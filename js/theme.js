const K = 'fa-theme';
export function initTheme() {
  let t; try { t = localStorage.getItem(K); } catch {}
  t = t || 'dark';
  document.documentElement.dataset.theme = t;
}
export function toggleTheme() {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(K, t); } catch {}
  return t;
}
initTheme();
