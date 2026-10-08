import React from 'react';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  hasFiltersActive: boolean;
  onResetFilters: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
  hasFiltersActive,
  onResetFilters,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center shadow-sm">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
          {hasFiltersActive ? <ClipboardList className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          {hasFiltersActive ? 'No tasks match your filter' : 'All caught up!'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
          {hasFiltersActive
            ? 'Try adjusting your search query, priority, category, or status filter.'
            : 'You have completed everything on your list. Add a new task above to get started!'}
        </p>
        {hasFiltersActive && (
          <button
            onClick={onResetFilters}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
