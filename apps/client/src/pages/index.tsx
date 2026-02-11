import Head from 'next/head';
import { useGrants } from '../features/NewMatches/hooks/useGrants';
import AllOpportunities from '@/features/AllOpportunities';
import NewMatches from '@/features/NewMatches';

export default function IndexPage() {
  const { loading, error } = useGrants(0, 4);

  if (loading) return <div className="p-8 font-sans">Loading grants...</div>;
  if (error) return <div className="p-8 text-red-500 font-sans">Error: {error.message}</div>;

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
