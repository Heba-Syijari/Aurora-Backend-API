import { PageComponent } from './page-component.entity';

export class Page {
  id: number;
  title: string;
  description: string;
  slug?: string;
  projectId: string;
  components?: PageComponent[];
}
