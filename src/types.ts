export type Priority = 'low' | 'medium' | 'high';

export type Category = 'Work' | 'Personal' | 'Study' | 'Health' | 'Finance' | 'Other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export type SortField = 'createdAt' | 'dueDate' | 'priority' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface TaskFilter {
  status: FilterStatus;
  category: string;
  priority: string;
  searchQuery: string;
  sortBy: SortField;
  sortOrder: SortOrder;
}
