import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Subscription } from 'src/datasource/entities/subscription.entity';

type ContentType = 'text' | 'image';

type Params = {
  subscription: Subscription;
  type: ContentType;
  amount: number;
};

export function consumeGenerationsValidationHandler({
  subscription,
  type,
  amount,
}: Params) {
  const { imageGenerations, textGenerations, isExpired } = subscription;

  if (isExpired) {
    throw new ForbiddenException('Your subscription is expired');
  }

  switch (type) {
    case 'image':
      if (imageGenerations < amount) {
        throw new BadRequestException(
          `Your [${imageGenerations} generations] is not enough for making image generation`,
        );
      }
      break;

    case 'text':
      if (textGenerations < amount) {
        throw new BadRequestException(
          `Your [${textGenerations} generations] is not enough for making text generation`,
        );
      }
      break;

    default:
      throw new BadRequestException(`Invalid type [${type}]`);
  }
}
