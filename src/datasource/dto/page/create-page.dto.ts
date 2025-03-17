export class CreatePageDto {
  title: string;
  description: string;
  projectId: string;
  components: { id: number; data: any; order: number }[];
}
