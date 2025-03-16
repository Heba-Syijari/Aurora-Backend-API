import { MediaVariation } from 'src/types';

export class Media {
  id: number;
  type: MediaVariation;
  title: string;
  path: string;
  projectId: string;
  viewTypes: string[];
}
