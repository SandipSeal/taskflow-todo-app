import React from 'react';
import { Search, ArrowUpDown, X } from 'lucide-react';
import { FilterStatus, Priority, SortField, TaskFilter } from '../types';

interface FilterBarProps {
  filter: TaskFilter;
  onFilterChange: (newFilter: TaskFilter) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const CATEGORIES = ['all', 'Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  counts,
}) => {
  const handleStatusChange = (status: FilterStatus) => {
    onFilterChange({ ...filter, status });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filter, category });
  };

  const handlePriorityChange = (priority: string) => {
    onFilterChange({ ...filter, priority });
  };

  const handleSearchChange = (searchQuery: string) => {
    onFilterChange({ ...filter, searchQuery });
  };

  const handleSortByChange = (sortBy: SortField) => {
    onFilterChange({ ...filter, sortBy });
  };

  const toggleSortOrder = () => {
    onFilterChange({
      ...filter,
      sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="flex flex-col gap-3 mb-6 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-8 py-1.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {filter.searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort and Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Sort by:</span>
            <select
              value={filter.sortBy}
              onChange={(e) => handleSortByChange(e.target.value as SortField)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="createdAt">Date Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>

            <button
              onClick={toggleSortOrder}
              className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title={`Sort ${filter.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Priority:</span>
            <select
              value={filter.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs and Categories */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-lg">
          {(['all', 'active', 'completed'] as FilterStatus[]).map((st) => {
            const count = counts[st];
            const isActive = filter.status === st;
            return (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`text-xs font-medium px-3 py-1 rounded-md transition-all capitalize flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{st}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                    : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Categories Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = filter.category === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border font-medium ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'All categories' : cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
