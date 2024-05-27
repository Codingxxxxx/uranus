import PhotoSwipeLightbox from 'photoswipe/photoswipe-lightbox.esm.js';

/**
 * @param {import('photoswipe').PhotoSwipeOptions} options
 */
export function initLightBox(gallerySelector) {
  const options = {
    gallery: gallerySelector,
    pswpModule: () => import('photoswipe/photoswipe.esm.js')
  };
  const lightbox = new PhotoSwipeLightbox(options);
  lightbox.init();
}