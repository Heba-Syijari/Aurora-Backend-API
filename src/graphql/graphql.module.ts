import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { JSONScalar } from 'src/common/graphql/scalars';

type Originalerror = {
  error: string;
  message: string | string[];
  statusCode: number;
};

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // playground: process.env.NODE_ENV !== 'production',
      introspection: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      resolvers: { JSON: JSONScalar },
      formatError(error) {
        const originalError = error.extensions?.originalError as Originalerror;

        if (originalError) {
          console.log({ originalError });
          const message = Array.isArray(originalError.message)
            ? originalError.message[0]
            : originalError.message;

          return {
            code: error.extensions?.code,
            message,
          };
        }

        return {
          message: error.message,
          code: error.extensions?.code,
        };
      },
    }),
  ],
})
export class GraphQLModule {}
