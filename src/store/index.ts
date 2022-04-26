import create from 'zustand';

interface IState {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
}

const useStore = create<IState>((set) => ({
  open: false,
  setOpen: () => set((state) => ({ ...state, open: true })),
  setClose: () => set((state) => ({ ...state, open: false })),
}));

export default useStore;
