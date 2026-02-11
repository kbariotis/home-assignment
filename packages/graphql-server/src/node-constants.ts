import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const SCHEMA_PATH = join(__dirname, '../schema/**/*.graphql');
export const DEFINITIONS_PATH = join(__dirname, './definitions.ts');
