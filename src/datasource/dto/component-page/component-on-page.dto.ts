import { Component } from '@prisma/client';

export class ComponentOnPage {
  id: number;
  componentId: number;
  pageId: number;
  data: any;
  order: number;
  component?: Component;
}
