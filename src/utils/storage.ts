import { Task } from '../types';

const STORAGE_KEY = 'taskflow_tasks_v1';
const THEME_KEY = 'taskflow_theme_v1';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Explore TaskFlow features',
    description: 'Try adding new tasks, filtering by priority, setting due dates, and toggling dark mode.',
    completed: true,
    priority: 'high',
    category: 'Personal',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Deploy to Vercel',
    description: 'Ship this production-ready application to the web!',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Review team weekly goals',
    description: 'Check OKR progress and prepare discussion points for 1-on-1s.',
    completed: false,
    priority: 'medium',
    category: 'Work',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: '30-minute afternoon workout',
    description: 'HIIT or light cardio session.',
    completed: false,
    priority: 'low',
    category: 'Health',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
];

export const loadTasksFromStorage = (): Task[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_TASKS;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : INITIAL_TASKS;
  } catch (e) {
    console.error('Failed to load tasks from localStorage', e);
    return INITIAL_TASKS;
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks to localStorage', e);
  }
};

export const loadThemeFromStorage = (): boolean => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

export const saveThemeToStorage = (isDark: boolean): void => {
  try {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  } catch (e) {
    console.error('Failed to save theme to localStorage', e);
  }
};
