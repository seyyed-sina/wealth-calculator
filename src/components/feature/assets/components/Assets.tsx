import { AssetForm, StepSection } from '@components';

export const Assets = () => {
  return (
    <StepSection title="دارایی ها" icon="wallet">
      <AssetForm />
    </StepSection>
  );
};

Assets.displayName = 'Assets';
