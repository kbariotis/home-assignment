import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
const watch = process.argv.includes('--watch');

definitionsFactory.generate({
  typePaths: [join(process.cwd(), './schema/**/*.graphql')],
  path: join(process.cwd(), './src/definitions.ts'),
  outputAs: 'interface',
  watch,
  skipResolverArgs: false,
});
