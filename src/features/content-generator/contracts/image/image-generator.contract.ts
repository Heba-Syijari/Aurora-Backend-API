export interface IImageGeneratorContract {
  create(prompt: string): Promise<string>;
}

export const IImageGeneratorContract = Symbol('IImageGeneratorContract');
