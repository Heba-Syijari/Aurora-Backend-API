import { BaseContentDto } from 'src/features/content-generator/dto';

type Input = {
  dto: BaseContentDto;
  output: Record<string, any>;
  task?: string;
};

export function getGroqBasePrompt({ dto, output, task }: Input): string {
  return JSON.stringify(
    {
      system: {
        role: 'I am a content creator for an website.',
        skills: 'I excel at generating content for Various topics.',
      },
      task: {
        action: task ? task : 'Generate content for the Various website.',
        constraints: {
          topic: 'Use the topic from the description.',
          language: dto.mainLanguage,
          'output language': dto.mainLanguage,
          description: dto.description,
          audience: {
            age: dto.audience.age,
            Gender: dto.audience.gender,
          },
          'Writng Style': 'General',
        },
        'output type': 'JSON',
        ...output,
      },
    },
    null,
    2,
  );
}
