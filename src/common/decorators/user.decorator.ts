import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { req } = GqlExecutionContext.create(ctx).getContext();
    const user = req.user;

    return data ? user?.[data] : user;
  },
);
