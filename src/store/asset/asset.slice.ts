import { StateCreator } from 'zustand';

import { Asset, AssetState } from './asset.type';

const initialState: AssetState = {
  assets: [{ title: '', value: '' }],
};

export const createAssetSlice: StateCreator<Asset> = (set) => ({
  ...initialState,
  setAssets: (assets: { title: string; value: string }[]) => {
    set((state) => ({ ...state, assets }));
  },
  resetAssets: () => set({ ...initialState }),
});
