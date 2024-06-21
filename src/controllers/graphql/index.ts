import { mergeResolvers } from '@graphql-tools/merge';
import authResolvers from './auth';

const resolvers = mergeResolvers([authResolvers]);

export { resolvers };
