import { BaseContentDto } from './base-content.dto';

export class RegenerateTextDto extends BaseContentDto {
  sectionType: string;
  itemType: string;
}
