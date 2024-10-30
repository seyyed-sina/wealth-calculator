import { Assets, Expenses } from '@components';

export default function Home() {
  return (
    <section>
      <div className="container py-8 flex flex-col gap-10">
        <Assets />
        <Expenses />
      </div>
    </section>
  );
}
