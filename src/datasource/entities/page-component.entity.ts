import { Component } from './component.entity';

export class PageComponent {
  id: number;
  componentId: number;
  pageId: number;
  elements?: string[];
  data: any;
  order: number;
  component?: Component;
}
