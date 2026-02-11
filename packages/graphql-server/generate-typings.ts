import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(process.cwd(), './schema/**/*.graphql')],
  path: join(process.cwd(), './src/definitions.ts'),
  outputAs: 'interface',
  watch: false,
  skipResolverArgs: false,
});
