import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePaletteInput } from './create-palette.input';

@InputType()
export class UpdatePaletteInput extends PartialType(CreatePaletteInput) {
  @Field()
  id: string;
}
