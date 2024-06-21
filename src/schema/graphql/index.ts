import { mergeTypeDefs } from '@graphql-tools/merge';
import authTypeDef from './auth';

const typeDefs = mergeTypeDefs([authTypeDef]);

export { typeDefs };
