import { ClientConfig } from './client-config';

const AllObjectPath = {
  BrandImage: 'brands/{fileUrl}'
};

/**
 * Create object path to cdn
 * @param {string} id 
 * @param {string} fileUrl 
 * @returns {string}
 */
export function getBrandImageObjectPath(fileUrl) {
  const objectUrl = AllObjectPath.BrandImage
    .replace('{fileUrl}', fileUrl);

  return ClientConfig.VITE_S3_DOMAIN + '/' + objectUrl;
}