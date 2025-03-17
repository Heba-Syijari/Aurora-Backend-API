import { CreateComponentPageDto } from './create-component-page.dto';

export interface UpdateComponentPageDto
  extends Partial<CreateComponentPageDto> {
  id: number;
}
