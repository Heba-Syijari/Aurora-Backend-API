import { ProjectTargetType } from '../entities/target-type';
export const projectTargetTypes: ProjectTargetType[] = [
  'Business & Services',
  'Store',
  'Creative',
  'Community',
  'Blogs',
  'Blank',
  'LMS',
  'Gym',
  'Development',
  'Medical',
  'Animation',
  'E-commerce',
  'IT',
  'Design',
  'Accounting',
  'Rel-estate',
  'Landing Page',
  'Management',
].map((title, i) => ({
  title,
  description: 'some description',
  imageUrl: `https://picsum.photos/200?random=${i + 1}`,
}));
