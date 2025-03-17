export class UpdatePageDto {
  pageId: number;
  title: string;
  description: string;
  components?: { id: number; data: string; order: number }[];
}
