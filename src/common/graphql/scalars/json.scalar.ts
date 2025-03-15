import { GraphQLScalarType } from 'graphql';

export const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'Represents JSON object',
  serialize: (value: any) => {
    if (typeof value === 'string') {
      return JSON.parse(value) || '';
    }

    return value;
  },
  parseValue: (value) => value,
  parseLiteral: (ast) => ast,
});
