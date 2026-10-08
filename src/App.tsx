import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { TaskInput } from './components/TaskInput';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { Task, TaskFilter } from './types';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  loadThemeFromStorage,
  saveThemeToStorage,
} from './utils/storage';

const INITIAL_FILTER: TaskFilter = {
  status: 'all',
  category: 'all',
  priority: 'all',
  searchQuery: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [isDark, setIsDark] = useState<boolean>(() => loadThemeFromStorage());
  const [filter, setFilter] = useState<TaskFilter>(INITIAL_FILTER);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveThemeToStorage(isDark);
  }, [isDark]);

  // Persist tasks changes
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const completed = !t.completed;
          return {
            ...t,
            completed,
            completedAt: completed ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleClearCompleted = () => {
    if (confirm('Are you sure you want to remove all completed tasks?')) {
      setTasks((prev) => prev.filter((t) => !t.completed));
    }
  };

  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(importedTasks);
  };

  const handleResetFilters = () => {
    setFilter(INITIAL_FILTER);
  };

  const counts = useMemo(() => {
    return {
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Status filter
    if (filter.status === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filter.status === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // Category filter
    if (filter.category !== 'all') {
      result = result.filter((t) => t.category === filter.category);
    }

    // Priority filter
    if (filter.priority !== 'all') {
      result = result.filter((t) => t.priority === filter.priority);
    }

    // Search query
    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    const priorityWeight: Record<string, number> = { high: 3, medium: 2, low: 1 };

    result.sort((a, b) => {
      let comparison = 0;
      switch (filter.sortBy) {
        case 'priority':
          comparison = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
          break;
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          comparison = a.dueDate.localeCompare(b.dueDate);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'createdAt':
        default:
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
      }
      return filter.sortOrder === 'asc' ? -comparison : comparison;
    });

    return result;
  }, [tasks, filter]);

  const hasFiltersActive =
    filter.status !== 'all' ||
    filter.category !== 'all' ||
    filter.priority !== 'all' ||
    filter.searchQuery !== '';

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col justify-between">
      <main className="space-y-2">
        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
          tasks={tasks}
          onImportTasks={handleImportTasks}
          onClearCompleted={handleClearCompleted}
          completedCount={counts.completed}
        />

        <StatsOverview tasks={tasks} />

        <TaskInput onAddTask={handleAddTask} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <TaskList
          tasks={filteredAndSortedTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          hasFiltersActive={hasFiltersActive}
          onResetFilters={handleResetFilters}
        />
      </main>

      <footer className="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-500">
        <p>Built with React, TypeScript & Tailwind CSS • Auto-saves to your local browser storage</p>
      </footer>
    </div>
  );
}
