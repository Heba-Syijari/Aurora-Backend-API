import { ValidationOptions, registerDecorator } from 'class-validator';
import { isFakeEmail } from 'fakefilter';
import { isDomainExists } from 'src/utils/dns';

export function IsNotFakeEmail(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isNotFakeEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [{ [propertyName]: 'The email is not valid' }],
      options: { ...validationOptions, message: 'The email is not valid' },
      validator: {
        async validate(email: any) {
          const isFake = await checkIsFakeEmail(email);

          return !isFake;
        },
      },
    });
  };
}

async function checkIsFakeEmail(email: string): Promise<boolean> {
  const isFake = !!isFakeEmail(email);

  if (isFake) return true;

  const isDomainReachable = await isDomainExists(email.split('@')[1]);

  if (!isDomainReachable) return true;

  return false;
}
