import { create } from "zustand";

export interface ModalStoreInterface {
  movieId?: string;
  isOpenRestful: boolean;
  openModal: (movieId: string) => void;
  closeModalRestful: () => void;
}

const useRestfulInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpenRestful: false,
  openModal: (movieId: string) => set({ isOpenRestful: true, movieId }),
  closeModalRestful: () => set({ isOpenRestful: false, movieId: undefined }),
}));

export default useRestfulInfoModal;
