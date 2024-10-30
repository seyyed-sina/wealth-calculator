import { AssetForm } from '@components';

export const Assets = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">درآمد ها (دارایی ها)</h2>
      <AssetForm />
    </div>
  );
};

Assets.displayName = 'Assets';
