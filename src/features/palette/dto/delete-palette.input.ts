import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeletePaletteInput {
  @Field()
  id: string;
}
