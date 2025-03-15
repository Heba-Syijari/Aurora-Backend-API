export interface IStorageService {
  getFileURL(path: string): string;

  getFilePublicURL(path: string): string;

  uploadFile(input: UploadInput): Promise<UploadOutput>;

  deleteFile(input: DeleteInput): Promise<DeleteOutput>;
}

export const IStorageService = Symbol('IStorageService');

export type UploadInput = {
  path: string;
  file: Buffer;
};

export type UploadOutput = {
  httpCode: number;
  message: string;
  filePath: string;
  fileURL: string;
};

export type DeleteInput = {
  path: string;
};

export type DeleteOutput = {
  httpCode: number;
  message: string;
};
