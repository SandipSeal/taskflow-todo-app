import React from 'react';
import { CheckCircle, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import { Task } from '../types';

interface StatsOverviewProps {
  tasks: Task[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const todayStr = new Date().toISOString().split('T')[0];
  const overdue = tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < todayStr).length;

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Tasks</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{total}</p>
        </div>
        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
          <ListTodo className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Completed</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{completed}</p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">({percent}%)</span>
          </div>
        </div>
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg">
          <CheckCircle className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{pending}</p>
        </div>
        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
          <Clock className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Overdue</p>
          <p className={`text-2xl font-bold mt-1 ${overdue > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
            {overdue}
          </p>
        </div>
        <div className={`p-2.5 rounded-lg ${overdue > 0 ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {total > 0 && (
        <div className="col-span-2 md:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
            <span>Overall Progress</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{percent}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
