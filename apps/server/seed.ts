import dataSource from './src/config/database.config';
import { Grant } from './src/grants/entities/grant.entity';

async function seed() {
  await dataSource.initialize();
  const repository = dataSource.getRepository(Grant);

  const grants = [
    {
      providerName: 'Vee Foundation',
      grantTitle: 'Community Impact Grant 2026',
      deadline: new Date('2026-06-30'),
      applyUrl: 'https://example.com/apply-1',
      location: 'New York, NY',
      areas: ['Education', 'Environment'],
      amount: 50000,
    },
    {
      providerName: 'Global Tech Fund',
      grantTitle: 'AI for Social Good',
      deadline: new Date('2026-08-15'),
      applyUrl: 'https://example.com/apply-2',
      location: 'Remote',
      areas: ['Technology', 'Research'],
      amount: 100000,
    },
    {
      providerName: 'Green Earth Initiative',
      grantTitle: 'Sustainable Farming Support',
      deadline: new Date('2026-05-10'),
      applyUrl: 'https://example.com/apply-3',
      location: 'California, USA',
      areas: ['Environment', 'Agriculture'],
      amount: 75000,
    },
    {
      providerName: 'Arts & Culture Trust',
      grantTitle: 'Digital Arts Fellowship',
      deadline: new Date('2026-07-01'),
      applyUrl: 'https://example.com/apply-4',
      location: 'London, UK',
      areas: ['Arts', 'Digital'],
      amount: 25000,
    },
    {
      providerName: 'Health Heroes',
      grantTitle: 'Mental Health Awareness Program',
      deadline: new Date('2026-09-20'),
      applyUrl: 'https://example.com/apply-5',
      location: 'Toronto, Canada',
      areas: ['Health', 'Mental Health'],
      amount: 60000,
    },
  ];

  for (const grantData of grants) {
    const grant = repository.create(grantData);
    await repository.save(grant);
    console.log(`Saved grant: ${grant.grantTitle}`);
  }

  await dataSource.destroy();
  console.log('Seeding complete!');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
