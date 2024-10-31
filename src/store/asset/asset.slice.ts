import { StateCreator } from 'zustand';

import { Asset, AssetState } from './asset.type';

const initialState: AssetState = {
  assets: [{ title: '', value: '' }],
  totalAssets: 0,
};

export const createAssetSlice: StateCreator<Asset> = (set) => ({
  ...initialState,
  setAssets: (assets: { title: string; value: string }[]) => {
    set((state) => ({ ...state, assets }));
  },
  setTotalAssets: (totalAssets: number) => {
    set((state) => ({ ...state, totalAssets }));
  },
  resetAssets: () => set({ ...initialState }),
});
