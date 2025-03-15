import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(name?: string) {
    super(`The [${name}] is not found`);
  }
}
