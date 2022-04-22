import create from 'zustand';

interface BearState {
  open: boolean;
  setOpen: () => void;
}

const useStore = create<BearState>((set) => ({
  open: false,
  setOpen: () => set((state) => ({ ...state, open: true })),
}));

export default useStore;
