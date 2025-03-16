import { ComponentType } from '@prisma/client';

export class Component {
  id: number;
  name: string;
  type: ComponentType;
  image: string;
}
