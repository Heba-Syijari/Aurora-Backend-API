/**
 * @param prefix the prefix might be the user id in some cases
 * @param originalName the original name of the file
 * @returns {string} the path of the file
 * @example "550e8400-e29b-41d4-a716-446655440000/2023-08/1691666611746.file_extension"
 */
function createBasePath(prefix: string, originalName: string): string {
  const folder = new Date().toISOString().split('-').slice(0, 2).join('-');
  const ext = originalName.match(/\.[a-zA-Z]+/g).slice(-1)[0];
  const filename = `${Date.now()}${ext}`;
  return [prefix, folder, filename].join('/');
}

/**
 * @param prefix the prefix might be the user id in some cases
 * @param originalName the original name of the file
 * @returns {string} the path of the file
 * @example "files/550e8400-e29b-41d4-a716-446655440000/2023-08/1691666611746.file_extension"
 */
export function createFilePath(prefix: string, originalName: string): string {
  return ['files', createBasePath(prefix, originalName)].join('/');
}

/**
 * @param prefix the prefix might be the user id in some cases
 * @param originalName the original name of the file
 * @returns {string} the path of the image
 * @example "images/550e8400-e29b-41d4-a716-446655440000/2023-08/1691666611746.jpg"
 */
export function createImagePath(prefix: string, originalName: string): string {
  return ['images', createBasePath(prefix, originalName)].join('/');
}

export async function extractImageInfoFromResponse(
  response: Response,
): Promise<Express.Multer.File> {
  const image = {
    buffer: Buffer.from(await response.arrayBuffer()),
    mimetype: response.headers.get('content-type'),
    size: +response.headers.get('content-length'),
    fieldname: 'image',
  } as Express.Multer.File;

  const imageExt = image.mimetype.includes('png') ? 'png' : 'jpg';

  image.originalname = `IMAGE_${Date.now()}.${imageExt}`;

  return image;
}
