import { FormStepProvider, PageHeader } from '@components';

export default function Home() {
  return (
    <>
      <PageHeader>
        <h1 className="font-bold text-center">خمس من</h1>
      </PageHeader>
      <FormStepProvider />
    </>
  );
}
