import { AssetForm } from '@components';

export const Assets = () => {
  return (
    <section>
      <h2 className="text-xl font-medium mb-6">درآمد ها (دارایی ها)</h2>
      <AssetForm />
    </section>
  );
};

Assets.displayName = 'Assets';
