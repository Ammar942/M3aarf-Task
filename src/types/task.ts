/** The four Kanban columns a task can live in */
export type ColumnId = 'todo' | 'in_progress' | 'review' | 'done';

/** Visual priority level for a task */
export type Priority = 'high' | 'medium' | 'low';

/** A single task card on the board */
export interface Task {
  id: number;
  title: string;
  description: string;
  column: ColumnId;
  priority: Priority;
}

/** Metadata used to render each column header */
export interface Column {
  id: ColumnId;
  label: string;
  color: string;
}

/** Shape of the form when creating or editing a task */
export type TaskFormValues = Omit<Task, 'id'>;
