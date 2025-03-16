export const blogsVariationTypes = ['BLOGS_ONE', 'BLOGS_TWO'] as const;

export type BlogsVariation = (typeof blogsVariationTypes)[number];
