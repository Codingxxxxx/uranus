import { ClientConfig } from './client-config';

const AllObjectPath = {
  BrandImage: 'brands/{id}/{fileUrl}'
};

/**
 * Create object path to cdn
 * @param {string} id 
 * @param {string} fileUrl 
 * @returns {string}
 */
export function getBrandImageObjectPath(id, fileUrl) {
  const objectUrl = AllObjectPath.BrandImage
    .replace('{id}', id)
    .replace('{fileUrl}', fileUrl);

  return ClientConfig.VITE_S3_DOMAIN + '/' + objectUrl;
}