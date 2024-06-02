import { ClientConfig } from './client-config';

const AllObjectPath = {
  BrandImage: 'brands/{fileUrl}',
  UserImage: 'users/{fileurl}'
};

/**
 * Create object path to brand image on cdn
 * @param {string} fileUrl 
 * @returns {string}
 */
export function getBrandImageObjectPath(fileUrl) {
  const objectUrl = AllObjectPath.BrandImage
    .replace('{fileUrl}', fileUrl);

  return ClientConfig.VITE_S3_DOMAIN + '/' + objectUrl;
}

/**
 * Create object path to brand image on cdn
 * @param {string} fileUrl 
 * @returns {string}
 */
export function getUserImageObjectPath(fileUrl) {
  const objectUrl = AllObjectPath.UserImage
    .replace('{fileUrl}', fileUrl);

  return ClientConfig.VITE_S3_DOMAIN + '/' + objectUrl;
}