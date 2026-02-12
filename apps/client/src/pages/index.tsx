import Head from 'next/head';
import AllOpportunities from '@/features/AllOpportunities';
import NewMatches from '@/features/NewMatches';

export default function IndexPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Head>
        <title>Grants | Vee</title>
      </Head>

      <div className="max-w-7xl mx-auto">
        <section className="mb-8">
          <NewMatches />
        </section>

        <section className="mt-20">
          <AllOpportunities />
        </section>
      </div>
    </div>
  );
}
