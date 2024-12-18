export interface AssetState {
  assets: { title: string; value: string }[];
  totalAssets: number;
}

export interface AssetAction {
  setAssets: (assets: { title: string; value: string }[]) => void;
  setTotalAssets: (totalAssets: number) => void;
  resetAssets: () => void;
}

export type Asset = AssetState & AssetAction;
