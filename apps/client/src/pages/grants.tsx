import { useQuery } from '@apollo/client/react';
import {  gql } from '@apollo/client';
import { Grant } from 'graphql-server';
import Head from 'next/head';

const GET_GRANTS = gql`
  query GetGrants($skip: Int, $take: Int) {
    grants(skip: $skip, take: $take) {
      id
      providerName
      grantTitle
      deadline
      amount
      location
      areas
    }
  }
`;

interface GrantsData {
  grants: Grant[];
}

export default function GrantsPage() {
  const { loading, error, data } = useQuery<GrantsData>(GET_GRANTS, {
    variables: { skip: 0, take: 4 },
  });

  if (loading) return <div className="p-8 font-sans">Loading grants...</div>;
  if (error) return <div className="p-8 text-red-500 font-sans">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Head>
        <title>Grants | Vee</title>
      </Head>
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Available Grants</h1>
          <p className="mt-4 text-lg text-gray-500">Explore and apply for grants tailored to your needs.</p>
        </header>

        <section>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data?.grants?.map((grant: Grant) => (
              <div key={grant.id} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                    {grant.providerName}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {grant.grantTitle}
                </h3>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center text-sm font-semibold text-gray-900">
                    <span className="text-green-600 mr-2">
                       <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {grant.amount || 'Variable'}
                  </div>

                  <div className="flex items-center text-[12px] text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{grant.deadline ? new Date(isNaN(Number(grant.deadline)) ? grant.deadline : Number(grant.deadline)).toLocaleDateString() : 'Rolling'}</span>
                  </div>

                  <div className="flex items-center text-[11px] text-gray-400">
                    <svg className="flex-shrink-0 mr-1.5 h-3 w-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {grant.location}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {grant.areas.slice(0, 3).map((area: string) => (
                      <span key={area} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                        {area}
                      </span>
                    ))}
                    {grant.areas.length > 3 && (
                      <span className="text-[10px] text-gray-400">+{grant.areas.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
