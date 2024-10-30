export interface AssetState {
  assets: { title: string; value: string }[];
}

export interface AssetAction {
  setAssets: (assets: { title: string; value: string }[]) => void;
  resetAssets: () => void;
}

export type Asset = AssetState & AssetAction;
