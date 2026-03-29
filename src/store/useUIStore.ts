import { create } from 'zustand';
import type { ColumnId } from '../types/task';

// ─────────────────────────────────────────────────────────────────────────────
//  UI-level state — things that don't need to be persisted or synced
// ─────────────────────────────────────────────────────────────────────────────

interface UIState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  visibleCount: Record<ColumnId, number>;
  showMore: (columnId: ColumnId) => void;
  resetVisible: (columnId: ColumnId) => void;
}

const INITIAL_VISIBLE = 5; // tasks shown per column before "Load more"
const LOAD_MORE_STEP = 5; // tasks added each time "Load more" is clicked

export const useUIStore = create<UIState>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  visibleCount: {
    todo: INITIAL_VISIBLE,
    in_progress: INITIAL_VISIBLE,
    review: INITIAL_VISIBLE,
    done: INITIAL_VISIBLE,
  },

  showMore: (columnId) =>
    set((state) => ({
      visibleCount: {
        ...state.visibleCount,
        [columnId]: state.visibleCount[columnId] + LOAD_MORE_STEP,
      },
    })),

  resetVisible: (columnId) =>
    set((state) => ({
      visibleCount: {
        ...state.visibleCount,
        [columnId]: INITIAL_VISIBLE,
      },
    })),
}));
