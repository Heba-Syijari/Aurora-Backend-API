import { BadGatewayException, NotFoundException } from '@nestjs/common';

export const needRecord = <T>(
  record?: T | null,
  err = new NotFoundException(),
): T => {
  if (!record) {
    throw err;
  }
  return record;
};

export const needExternalServiceResponse = <T>(
  response?: T | null,
  errMessage = 'External service error occurred.',
): T => {
  if (!response) {
    throw new BadGatewayException(errMessage);
  }
  return response;
};

// export const existRecord = <T>(
//   record?: T | null,
//   err = new ConflictError('Already exists'),
// ) => {
//   if (record) {
//     throw err;
//   }
// };
